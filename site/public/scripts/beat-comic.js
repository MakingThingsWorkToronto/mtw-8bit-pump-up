/* Beat Comic engine (src/components/BeatComic.astro; skill: mtw-beat-comic): an old-school comic fused into the pixel
   grid, cut to a song. The story (pages, panels, captions, SFX) is JSON in #reel-story; this file
   only plays it. One clock drives everything: the music's own currentTime while it plays, otherwise performance.now(),
   so every cut lands on the track's beats. Any moment can be seeked (?t=seconds, ?hold freezes; ?slow=6 slows the
   collapse; ?mute starts without music).
   - Back canvas: the Grid Background's tiles, a teal campfire glowing up from the bottom rows with embers rising, and
     the pen's trail: tiles light up behind the pen as it inks each panel's frame.
   - Panels: flat comic frames inked by an SVG stroke; imagery posterized to the brand's four flat colours with an
     ordered (square) dither, and pixelated in steps that resolve as the panel lands, re-pixelating when an SFX hits.
   - Front canvas: page cuts in the page transition's square tiles, swept in straight lines (never radial).
   - The first wheel, swipe or scroll key collapses the stage into the static hero's glass panel and releases the scroll
     reveal, which then types the real heading. Classic script, no dependencies. */
(function () {
  var root = document.documentElement;
  var stage = document.querySelector('[data-reel-stage]');
  var dataEl = document.getElementById('reel-story');
  if (!root.hasAttribute('data-reel')) return;
  if (!stage || !dataEl || !window.MTWPixel) { root.setAttribute('data-reel', 'done'); root.removeAttribute('data-mtw-reveal'); return; }

  var story = JSON.parse(dataEl.textContent);
  var q = new URLSearchParams(location.search);
  var B = 60 / story.bpm, BEATS = story.beats, LOOP = BEATS * B;
  var back = stage.querySelector('.rl-back'), front = stage.querySelector('.rl-front');
  var bctx = back.getContext('2d'), fctx = front.getContext('2d');
  var book = stage.querySelector('.rl-book'), closeEl = stage.querySelector('.rl-close'), scenesEl = stage.querySelector('.rl-scenes');
  var progress = null;
  var tag = stage.querySelector('.rl-tag'), muteBtn = stage.querySelector('.rl-tag__mute');
  var TB = window.MTWToolbar || null;
  function tbOpen() { return !!(TB && TB.isOpen()); }
  var W = 0, H = 0, dpr = 1, pitch = 24, stageRect = null;
  var markOutline = new Path2D(story.markPaths.outline), markM = new Path2D(story.markPaths.m);

  /* ---------- Easing and noise ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function c01(v) { return clamp(v, 0, 1); }
  function out3(p) { p = c01(p); return 1 - Math.pow(1 - p, 3); }
  function inOut(p) { p = c01(p); return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function backOut(p) { p = c01(p); var c = 2.2; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }
  function hash(x, y, k) { var h = (x * 374761393 + y * 668265263 + k * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
  function el(tagName, cls, parent) { var e = document.createElement(tagName); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; }
  function markSvg() {
    var ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg'); s.setAttribute('viewBox', '0 0 115 151'); s.setAttribute('aria-hidden', 'true');
    var a = document.createElementNS(ns, 'path'); a.setAttribute('d', story.markPaths.outline); a.setAttribute('fill', 'currentColor'); a.setAttribute('fill-rule', 'evenodd');
    var b = document.createElementNS(ns, 'path'); b.setAttribute('d', story.markPaths.m); b.setAttribute('fill', '#1a9ba1');
    s.appendChild(a); s.appendChild(b); return s;
  }

  /* ---------- Build the book ---------- */
  var images = {};
  function image(src) {
    if (images[src]) return images[src];
    var im = new Image(); im.decoding = 'async'; im.src = src;
    im.onload = function () { panels.forEach(function (p) { if (p.src === src) p.drawn = ''; }); if (state === 'paused') render(T); };
    return (images[src] = im);
  }
  function typeInto(box, text) {
    var chars = [];
    text.split(/(\s+)/).forEach(function (word) {
      if (!word) return;
      if (/^\s+$/.test(word)) { box.appendChild(document.createTextNode(' ')); return; }
      var w = el('span', 'rv-word', box);
      Array.prototype.forEach.call(word, function (ch) { var s = el('span', 'rl-ch', w); s.textContent = ch; chars.push(s); });
    });
    return chars;
  }
  var pages = [], panels = [], links = [], rowLinks = [], sfxs = [], events = [], freezes = [];
  story.pages.forEach(function (pg, pi) {
    var page = el('div', 'rl-page', book);
    var P = { el: page, b: pg.b, l: pg.l, ground: pg.ground || 'ink', panels: [], index: pi, ember: pg.ember || 1, field: !!pg.field, planes: pg.planes, close: !!pg.close, chapter: 0, links: stage.querySelector('.rl-links__page[data-page="' + pi + '"]') };
    (pg.freeze || []).forEach(function (f) { freezes.push([(pg.b + f[0]) * B, (pg.b + f[1]) * B]); });
    if (pg.title) {
      var t = el('div', 'rl-title', scenesEl);
      el('p', '', t).textContent = pg.title; el('p', '', t).textContent = pg.title;
      P.title = t;
    }
    (pg.panels || []).forEach(function (d, ki) {
      var pan = el('div', d.sound ? 'rl-panel rl-panel--sound' : d.tracks ? 'rl-panel rl-panel--tracks' : 'rl-panel', page);
      var art = el('div', 'rl-panel__art', pan), cv = null;
      if (d.img || d.pix || d.chart || d.mark || d.chat || d.marquee || d.sound || d.cd || d.ticker || d.tracks) cv = el('canvas', '', art);
      var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'); svg.setAttribute('class', 'rl-ink'); svg.setAttribute('aria-hidden', 'true');
      var ink = document.createElementNS(ns, 'rect');
      ink.setAttribute('x', '0'); ink.setAttribute('y', '0'); ink.setAttribute('pathLength', '1'); ink.style.strokeDasharray = '1'; ink.style.strokeDashoffset = '1';
      svg.appendChild(ink); pan.appendChild(svg);
      var p = { page: P, d: d, el: pan, art: art, cv: cv, ctx: cv && cv.getContext('2d', { willReadFrequently: true }), svg: svg, ink: ink, t: (pg.b + d.at) * B, drawn: '', css: '', gOff: (ki % 5) / 5 };
      if (d.img) { p.src = d.img.src; p.fit = d.img.fit; image(d.img.src); }
      if (d.cap) { p.cap = el('div', 'rl-cap', pan); p.capChars = typeInto(p.cap, d.cap); }
      if (d.cap2) { p.cap2 = el('div', 'rl-cap rl-cap--2', pan); p.cap2Chars = typeInto(p.cap2, d.cap2); p.t2 = (pg.b + d.at2) * B; }
      if (d.name) { p.name = el('div', 'rl-name', pan); p.name.textContent = d.name; }
      if (d.tag) { p.tag = el('div', 'rl-tag-group', pan); p.tag.textContent = d.tag; }
      // The ways in: a service cell's real link (BeatComic.astro's nav.rl-links, outside the aria-hidden scenes).
      if (d.href && P.links) { p.link = P.links.querySelector('[data-panel="' + ki + '"]:not([data-row])'); if (p.link) links.push(p); }
      // Hover or focus lights the panel under its link (a panel without a name bar lights its caption box).
      if (p.link) (function (pan) { ['pointerenter', 'focus', 'pointerleave', 'blur'].forEach(function (ev, i) { p.link.addEventListener(ev, function () { pan.classList.toggle('is-hot', i < 2); }); }); })(pan);
      // A tracklist's rows: each row with an href has its own link (BeatComic.astro); hover or focus lights the row.
      if (d.tracks) {
        p.hot = -1; p.B = B;
        if (P.links) Array.prototype.forEach.call(P.links.querySelectorAll('[data-panel="' + ki + '"][data-row]'), function (a) {
          var R = { p: p, a: a, ri: +a.getAttribute('data-row') }; rowLinks.push(R);
          ['pointerenter', 'focus', 'pointerleave', 'blur'].forEach(function (ev, i) {
            a.addEventListener(ev, function () {
              if (i < 2) p.hot = R.ri; else if (p.hot === R.ri) p.hot = -1;
              p.el.setAttribute('data-hot', p.hot);
              if (state !== 'play') render(T); // a held or paused frame redraws the lit row too
            });
          });
        });
      }
      P.panels.push(p); panels.push(p);
      events.push({ t: p.t, kick: 0.012 });
    });
    (pg.sfx || []).forEach(function (s) {
      var x = el('div', 'rl-sfx', book);
      var S = { el: x, cv: el('canvas', '', x), sp: {}, w: s.w, sub: s.sub || '', len: s.still && story.holdEnd ? Infinity : (s.len || 2.6) * B, still: !!s.still, t: (pg.b + s.at) * B, page: P, r: s.r || 0, css: '', x: s.x, y: s.y };
      sfxs.push(S); events.push({ t: S.t, kick: 0.03, shake: S.still ? 0 : 12 });
    });
    pages.push(P);
  });
  // The MTW corner box, like an old comic's publisher box, numbered by chapter.
  var corner = el('div', 'rl-corner', scenesEl); corner.appendChild(markSvg()); var cornerNo = el('span', '', corner);
  var closeT = story.close * B, chapterNo = 0;
  pages.forEach(function (P) { if (P.title) P.chapter = ++chapterNo; });
  // Freeze frames on the song's dead stops: the motion clock holds while the music is silent.
  function motion(t) { for (var i = 0; i < freezes.length; i++) if (t >= freezes[i][0] && t < freezes[i][1]) return freezes[i][0]; return t; }
  // The close's parts, in the order they land: the heading (two lines, or one flowing heading in a full-bleed close), the
  // lede, then the hero image (or the homepage's panel, or the full-bleed image behind it all).
  var closeHeads = Array.prototype.slice.call(closeEl.querySelectorAll('.rl-hero-h'));
  var closeLede = closeEl.querySelector('.rl-close__lede');
  var closeArt = Array.prototype.slice.call(closeEl.querySelectorAll('.rl-close__panel, .rl-close__art, .rl-close__bleed'));
  var closeParts = closeHeads.concat(closeLede ? [closeLede] : [], closeArt);
  var BLEED = story.closeScene.layout === 'full-bleed';
  // The close through the ages (Matt, 2026-09-27: "transform from 8 bit pixelated heading text to the modern heading text
  // and that represents the transition in tech that i have been through"; 2026-09-28: "ensure the text animates claner,
  // we are using boxy big pixels and the end is a nice smooth font. The animation on all pages needs to take us from 8 bit
  // to common pixels to 2026 pixels, this is an animation through the ages of pixelation", "fade the section image in
  // AFTER the font clarifies to beauty text"). The heading lands as big boxy 8-bit pixels and holds; from the close's
  // `pixelate` beat it resolves in clean stages a beat apart, each a hard cut on the beat: 16-bit, then the familiar
  // pixels of a desktop screen, then the page's own smooth type. Every stage is drawn in the heading's own colours with
  // hard 1-bit edges (no in-between colours, no fringe), each word exactly where the page's type sets it, so the last cut
  // to smooth type does not move a letter. The image fades in only after that.
  var PX_EM = [16, 28, 48]; // pixels to the em: 8-bit, 16-bit, the familiar screen pixels; then the page's type
  var AT0 = typeof story.closeScene.pixelate === 'number' ? story.closeScene.pixelate : 5;
  var SMOOTH_AT = story.closeScene.pixelate ? AT0 + PX_EM.length - 1 : 0; // close beat the type is smooth
  var ART_AT = story.closeScene.pixelate ? SMOOTH_AT + 0.5 : 4, ART_FADE = 1; // the image: half a beat later, over a beat
  var headPx = story.closeScene.pixelate ? closeHeads.map(function (h) {
    // Each word becomes its own span (its accent span kept), so the pixel stages set every word where the type sits.
    var words = [];
    (function split(node, color) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 1) { split(n, getComputedStyle(n).color); return; }
        if (n.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var s = document.createElement('span'); s.className = 'rl-hw'; s.textContent = part; frag.appendChild(s); words.push({ el: s, color: color });
        });
        n.parentNode.replaceChild(frag, n);
      });
    })(h, getComputedStyle(h).color);
    var o = { el: h, cv: el('canvas', 'rl-hero-px', h), words: words, key: '' };
    h.classList.add('is-px'); return o;
  }) : [];
  function drawHeadPx(t) {
    if (!headPx.length) return;
    var lb = (t - closeT) / B, stage = lb < AT0 ? 0 : Math.floor(lb - AT0) + 1;
    headPx.forEach(function (o) {
      if (stage >= PX_EM.length) { if (o.key !== 'crisp') { o.key = 'crisp'; o.el.classList.remove('is-px'); o.cv.style.display = 'none'; } return; }
      var cs = getComputedStyle(o.el), fs = parseFloat(cs.fontSize) || 80, px = Math.max(1, Math.round(fs / PX_EM[stage]));
      var w = o.el.offsetWidth, h = o.el.offsetHeight, key = px + ':' + w + ':' + h;
      if (o.key === key) return;
      o.key = key; o.el.classList.add('is-px'); o.cv.style.display = '';
      var cw = Math.max(2, Math.ceil(w / px)), ch = Math.max(2, Math.ceil(h / px)), c = o.cv.getContext('2d', { willReadFrequently: true });
      o.cv.width = cw; o.cv.height = ch; o.cv.style.width = cw * px + 'px'; o.cv.style.height = ch * px + 'px';
      c.clearRect(0, 0, cw, ch);
      c.font = cs.fontWeight + ' ' + (fs / px) + 'px ' + cs.fontFamily;
      if ('letterSpacing' in c) c.letterSpacing = (parseFloat(cs.letterSpacing) || 0) / px + 'px';
      c.textBaseline = 'alphabetic';
      var asc = c.measureText('H').fontBoundingBoxAscent || fs / px * 0.8;
      // Each word at its own place in the page's type: its box's left, and its baseline one ascent below its top.
      o.words.forEach(function (wd) { c.fillStyle = wd.color; c.fillText(wd.el.textContent, wd.el.offsetLeft / px, wd.el.offsetTop / px + asc); });
      // Hard edges: every pixel is the type's own colour or clear.
      var img = c.getImageData(0, 0, cw, ch), d = img.data;
      for (var i = 3; i < d.length; i += 4) d[i] = d[i] >= 110 ? 255 : 0;
      c.putImageData(img, 0, 0);
    });
  }
  // A full-bleed close (a Journal entry, About Matt): the image and its crop are the page hero's own, and the heading and
  // lede take the page title's place, size and column, so the fold lands on the same picture.
  function placeBleed() {
    if (!BLEED) return;
    var fig = closeEl.querySelector('.rl-close__bleed'), im = fig && fig.querySelector('img'), src = story.closeScene.image && story.closeScene.image.src;
    var hero = Array.prototype.find.call(document.querySelectorAll('.page-body img'), function (x) { return src && (x.getAttribute('src') === src || x.currentSrc.indexOf(src) >= 0); });
    var sr = stage.getBoundingClientRect();
    if (im && hero) {
      // The same box and the same crop as the page's hero picture (a phone's hero is shorter than the screen).
      var hs = getComputedStyle(hero), hb = hero.getBoundingClientRect();
      im.style.objectPosition = hs.objectPosition; im.style.objectFit = hs.objectFit;
      if (hb.width > 0 && hb.height > 0) fig.style.cssText = 'top:' + (hb.top - sr.top).toFixed(1) + 'px;left:' + (hb.left - sr.left).toFixed(1) + 'px;width:' + hb.width.toFixed(1) + 'px;height:' + hb.height.toFixed(1) + 'px;right:auto;bottom:auto';
    }
    var h1 = document.querySelector('.page-body h1'), box = h1 && h1.parentElement, grid = closeEl.querySelector('.rl-close__grid');
    if (!h1 || !grid) return;
    var r = box.getBoundingClientRect(), hs1 = getComputedStyle(h1), lede = box.querySelector('.lede');
    grid.style.cssText = 'position:absolute;left:' + (r.left - sr.left).toFixed(1) + 'px;top:' + (r.top - sr.top).toFixed(1) + 'px;width:' + r.width.toFixed(1) + 'px';
    var bal = /balance/.test((hs1.textWrapStyle || '') + ' ' + (hs1.textWrap || ''));
    closeHeads.forEach(function (e) { e.style.fontSize = hs1.fontSize; e.style.lineHeight = hs1.lineHeight; e.style.letterSpacing = hs1.letterSpacing; e.style.fontWeight = hs1.fontWeight; if (bal) e.style.textWrap = 'balance'; });
    if (lede && closeLede) { var ls = getComputedStyle(lede); closeLede.style.fontSize = ls.fontSize; closeLede.style.lineHeight = ls.lineHeight; closeLede.style.marginTop = ls.marginTop; closeLede.style.color = ls.color; closeLede.style.maxWidth = 'none'; }
    headPx.forEach(function (o) { o.key = ''; });
  }

  /* ---------- Layout ---------- */
  function measure() {
    var r = stage.getBoundingClientRect();
    stageRect = r; W = Math.round(r.width); H = Math.round(r.height); dpr = Math.min(2, window.devicePixelRatio || 1);
    [back, front].forEach(function (c) { c.width = W * dpr; c.height = H * dpr; });
    pitch = Math.round(Math.max(18, Math.min(28, W / 58)));
    // Portrait screens read the page transposed: columns become rows, so four tall panels stack as four wide ones.
    var portrait = book.offsetHeight > book.offsetWidth * 1.1;
    // Pages built from full-width rows already suit portrait and keep their layout; so does the close, which is the page's
    // own hero layout rather than a panel grid (its slam keeps its landscape position).
    pages.forEach(function (P) { P.flip = portrait && !P.close && !P.panels.some(function (q) { return q.d.r[2] >= 0.99; }); });
    panels.forEach(function (p) {
      // A panel may give its own portrait rectangle (rp); otherwise the page's flip rule applies.
      var r = p.d.r, v = portrait && p.d.rp ? p.d.rp : p.page.flip ? [r[1], r[0], r[3], r[2]] : r;
      [p.el, p.link].forEach(function (e) { if (e) { e.style.setProperty('--x', v[0]); e.style.setProperty('--y', v[1]); e.style.setProperty('--w', v[2]); e.style.setProperty('--h', v[3]); } });
    });
    sfxs.forEach(function (S) { var f = S.page.flip; S.el.style.left = ((f ? S.y : S.x) * 100) + '%'; S.el.style.top = ((f ? S.x : S.y) * 100) + '%'; });
    var br = book.getBoundingClientRect();
    book.bx = br.left - r.left; book.by = br.top - r.top; book.bw = br.width; book.bh = br.height;
    // A chapter title stays on one line, shrunk to fit the banner: a wrapped title doubled the banner and read as a
    // stretched card (Matt, 2026-09-26: "many of the titles have a strange aspect ratio").
    pages.forEach(function (P) {
      if (!P.title) return;
      var ps = P.title.querySelectorAll('p'), avail = W - 2 * (parseFloat(getComputedStyle(P.title).paddingLeft) || 16);
      ps.forEach(function (e) { e.style.fontSize = ''; });
      var w0 = ps[0].scrollWidth;
      if (w0 > avail) { var fs = parseFloat(getComputedStyle(ps[0]).fontSize) * avail / w0; ps.forEach(function (e) { e.style.fontSize = fs.toFixed(1) + 'px'; }); }
    });
    panels.forEach(function (p) {
      p.w = p.el.offsetWidth; p.h = p.el.offsetHeight;
      p.x = book.bx + p.el.offsetLeft; p.y = book.by + p.el.offsetTop;
      p.ink.setAttribute('width', Math.max(0, p.w)); p.ink.setAttribute('height', Math.max(0, p.h));
      p.svg.setAttribute('viewBox', '0 0 ' + p.w + ' ' + p.h);
      p.drawn = '';
      if (p.d.tracks) p.tl = trackLayout(p);
    });
    // Each tracklist row's link lies over its row (panel offset plus the row's box; the page layer carries the camera).
    rowLinks.forEach(function (R) {
      var b = R.p.tl && R.p.tl.css[R.ri]; if (!b) return;
      var s = R.a.style; s.left = (R.p.el.offsetLeft + b[0]).toFixed(1) + 'px'; s.top = (R.p.el.offsetTop + b[1]).toFixed(1) + 'px'; s.width = b[2].toFixed(1) + 'px'; s.height = b[3].toFixed(1) + 'px';
    });
    placeBleed();
  }

  /* ---------- 8-bit drawing shared with the motion toolbar (public/scripts/motion-toolbar.js, loaded first) ----------
     The pixel font, the marquee strip (strip) and the tracklist layout and rows (trackLayout, trackState, drawTracks)
     live in the toolbar's script, so the homepage cover's tracklist and the Tracklist dialog are one renderer. */
  var PX = window.MTWPixel;
  var pfW = PX.pfW, pfDraw = PX.pfDraw, strip = PX.strip, TK = PX.TK, trackLayout = PX.trackLayout, trackState = PX.trackState, drawTracks = PX.drawTracks;

  /* ---------- Pixel art: drawn small, posterized to four flat brand colours, shown large and pixelated ---------- */
  var STEPS = [56, 40, 28, 20, 14, 10, 8, 6], STEP_T = 0.04, FINAL = 6;
  var FLAT = [[17, 33, 38], [26, 155, 161], [95, 196, 201], [242, 242, 239]], CUTS = [0.21, 0.36, 0.62];
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function posterize(c, cw, ch) {
    var img = c.getImageData(0, 0, cw, ch), d = img.data, n = cw * ch, lum = new Float32Array(n), hist = new Uint32Array(64);
    for (var q2 = 0; q2 < n; q2++) { var o = q2 * 4, l = (0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2]) / 255; lum[q2] = l; hist[Math.min(63, (l * 64) | 0)]++; }
    // Auto-levels: stretch between the 4th and 97th percentile, so dark photographs still use all four flat colours.
    var acc = 0, lo = 0, hi = 1;
    for (var h = 0; h < 64; h++) { acc += hist[h]; if (acc < n * 0.04) lo = (h + 1) / 64; if (acc <= n * 0.97) hi = (h + 1) / 64; }
    var span = Math.max(0.15, hi - lo);
    for (var y = 0; y < ch; y++) for (var x = 0; x < cw; x++) {
      var i = (y * cw + x) * 4, L = (lum[y * cw + x] - lo) / span;
      L += (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 0.12;
      var k = L < CUTS[0] ? 0 : L < CUTS[1] ? 1 : L < CUTS[2] ? 2 : 3, f = FLAT[k];
      d[i] = f[0]; d[i + 1] = f[1]; d[i + 2] = f[2]; d[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
    return img;
  }
  // Pixel shimmer (Matt, 2026-09-28: "mess with the opactiy of the pixelation so they glimmer", "make those images glimmer
  // please pixel by pixel", then "the holo graphics are just animating up and down 1 px it looks like a bug, keep still
  // site wide but add shimmer to pixels"). Every image panel keeps its posterized pixel grid (drawn once per pixel size)
  // and stays where it is; each final pixel's opacity dips on its own phase over the flat panel colour (four levels), and
  // once a cycle a lit pixel sparkles for a step a palette step brighter (teal to teal-light, teal-light to paper), stepped
  // 12 times a second on the motion clock. Flat colours only, no blur, nothing radial; still on a freeze and a pause. The
  // one-pixel nod on the beat (825c107b) is gone: it read as a bug.
  var GL = new Uint8Array(64), GL_DIP = 0.42, GL_LEN = 14;
  for (var gi = 0; gi < 64; gi++) GL[gi] = Math.round(255 * (1 - GL_DIP * Math.round((gi < GL_LEN ? Math.sin(gi / GL_LEN * Math.PI) : 0) * 3) / 3));
  var SPARK_AT = 40; // the phase step (and the one after it) on which a lit pixel sparkles
  // Each panel steps on its own twelfth of a second (glimStep), so a grid of images does not all redraw on one frame.
  function glimStep(p, mt) { return Math.floor(mt * 12 + p.gOff); }
  function glimmer(p, c, cw, ch, mt) {
    var n = cw * ch, g = glimStep(p, mt);
    if (!p.gph || p.gph.length !== n) { p.gph = new Uint8Array(n); for (var k = 0; k < n; k++) p.gph[k] = (hash(k % cw, (k / cw) | 0, 31) * 64) | 0; }
    if (!p.work || p.work.width !== cw || p.work.height !== ch || p.workOf !== p.base) { p.work = c.createImageData(cw, ch); p.work.data.set(p.base.data); p.workOf = p.base; p.sparks = []; }
    var s = p.base.data, o = p.work.data, ph = p.gph, sp = p.sparks, i, j, q, a, up;
    // Last step's sparkles go back to their own colour.
    for (i = 0; i < sp.length; i++) { j = sp[i] * 4; o[j] = s[j]; o[j + 1] = s[j + 1]; o[j + 2] = s[j + 2]; }
    sp.length = 0;
    // Odd phases run twice as fast, so neighbours never pulse together.
    for (i = 0; i < n; i++) {
      q = ph[i]; a = (q + g * (1 + (q & 1))) & 63; j = i * 4; o[j + 3] = GL[a];
      if ((a & 62) === SPARK_AT) { up = s[j] === 26 ? FLAT[2] : s[j] === 95 ? FLAT[3] : null; if (up) { o[j] = up[0]; o[j + 1] = up[1]; o[j + 2] = up[2]; o[j + 3] = 255; sp.push(i); } }
    }
    c.putImageData(p.work, 0, 0);
  }
  var SNAP = [[11, 20, 25], [26, 155, 161], [95, 196, 201], [242, 242, 239]];
  // The SFX slabs use no teal: snapping their anti-aliased edges to ink, teal-light or paper only keeps the rim and the
  // type outline crisp instead of fringed with teal (Matt, 2026-09-28: "for the pow effects make the borders slightly
  // crisper").
  var SNAP_SLAB = [SNAP[0], SNAP[2], SNAP[3]];
  function snapFlat(c, w, h, pal) {
    var img = c.getImageData(0, 0, w, h), d = img.data, P = pal || SNAP, np = P.length;
    for (var i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 110) { d[i + 3] = 0; continue; }
      var best = 0, bd = 1e9;
      for (var k = 0; k < np; k++) { var s = P[k], dr = d[i] - s[0], dg = d[i + 1] - s[1], db = d[i + 2] - s[2], dd = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11; if (dd < bd) { bd = dd; best = k; } }
      d[i] = P[best][0]; d[i + 1] = P[best][1]; d[i + 2] = P[best][2]; d[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
  }
  function sprite(sp, cv, cssW, cssH, px, extra, draw, pal) {
    var key = px + ':' + Math.round(cssW) + ':' + Math.round(cssH) + ':' + extra;
    if (sp.key === key) return; sp.key = key;
    var w = Math.max(2, Math.ceil(cssW / px)), h = Math.max(2, Math.ceil(cssH / px)), c = sp.ctx || (sp.ctx = cv.getContext('2d', { willReadFrequently: true }));
    cv.width = w; cv.height = h; cv.style.width = cssW + 'px'; cv.style.height = cssH + 'px';
    c.setTransform(w / cssW, 0, 0, h / cssH, 0, 0); c.clearRect(0, 0, cssW, cssH);
    draw(c);
    c.setTransform(1, 0, 0, 1, 0, 0); snapFlat(c, w, h, pal);
  }
  function font(size) { return '700 ' + size + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; }
  // Poster type: an ink shadow, an ink outline and a paper face.
  function poster(c, text, x, y, size, face) {
    c.font = font(size); c.textBaseline = 'alphabetic'; c.lineJoin = 'round';
    c.fillStyle = '#0b1419'; c.fillText(text, x + size * 0.06, y + size * 0.06);
    c.strokeStyle = '#0b1419'; c.lineWidth = size * 0.1; c.strokeText(text, x, y);
    c.fillStyle = face || '#f2f2ef'; c.fillText(text, x, y);
  }
  var JAG = [[0, .12], [.06, 0], [.14, .1], [.24, 0], [.34, .09], [.45, 0], [.56, .1], [.67, 0], [.78, .09], [.88, 0], [.96, .11], [1, .04], [.98, .5], [1, .92], [.94, 1], [.84, .9], [.73, 1], [.62, .91], [.51, 1], [.4, .9], [.29, 1], [.18, .91], [.08, 1], [0, .88], [.02, .5]];
  function jag(c, x, y, w, h) { c.beginPath(); JAG.forEach(function (q, i) { c[i ? 'lineTo' : 'moveTo'](x + q[0] * w, y + q[1] * h); }); c.closePath(); }
  var SFX_STEPS = [30, 20, 13, 9, 6];
  function stepPx(steps, lp, fin) { var px = lp < 0 ? steps[0] : steps[Math.min(steps.length - 1, Math.floor(lp / STEP_T))]; return Math.max(fin, Math.round(px * (W < 700 ? 0.6 : 1))); }
  function drawSfx(S, lp) {
    var F = W < 700 ? clamp(W * 0.13, 40, 70) : clamp(W * 0.075, 64, 138), sub = S.sub ? F * 0.42 : 0, c0 = S.sp.ctx || S.cv.getContext('2d');
    c0.font = font(F); var tw = c0.measureText(S.w).width; c0.font = font(sub || 1); var sw = sub ? c0.measureText(S.sub.toUpperCase()).width : 0;
    var bw = Math.max(tw, sw) + F * 1.0, bh = F * 0.86 + (sub ? sub * 1.5 : 0) + F * 0.62, mx = S.still ? F * 0.2 : F * 0.9, cw = bw + mx * 2, ch = bh + F * 0.3;
    var px = stepPx(SFX_STEPS, lp, S.sub ? 3 : (W < 700 ? 3 : 4));
    // A slab with a sub-line settles finer, about eleven pixels to the sub-line's height, so the line can be read.
    if (sub && lp >= STEP_T * (SFX_STEPS.length - 1)) px = Math.max(2, Math.min(px, Math.round(sub / 11)));
    // The rim and the offset are whole sprite pixels, and the slab's corners sit on the pixel grid, so its border steps
    // cleanly instead of breaking up.
    var wp = function (v) { return Math.max(px, Math.round(v / px) * px); };
    var sx0 = wp(mx), sy0 = wp(F * 0.1), sbw = wp(bw), sbh = wp(bh);
    sprite(S.sp, S.cv, cw, ch, px, S.w, function (c) {
      if (!S.still) {
        // Speed lines: straight, slanted, behind the slab.
        c.fillStyle = '#f2f2ef';
        for (var i = 0; i < cw / (F * 0.3); i++) { var y = ch * 0.3 + (i % 5) * ch * 0.1, x = i * F * 0.3; c.fillRect(x, y, F * 0.9, Math.max(2, F * 0.045)); }
      }
      c.fillStyle = '#0b1419'; jag(c, sx0 + wp(F * 0.09), sy0 + wp(F * 0.09), sbw, sbh); c.fill();
      jag(c, sx0, sy0, sbw, sbh); c.fillStyle = '#5fc4c9'; c.fill(); c.strokeStyle = '#0b1419'; c.lineWidth = wp(F * 0.07); c.stroke();
      poster(c, S.w, mx + (bw - tw) / 2, F * 0.1 + F * 0.31 + F * 0.8, F);
      if (sub) { c.font = font(sub); c.fillStyle = '#0b1419'; c.fillText(S.sub.toUpperCase(), mx + (bw - sw) / 2, F * 0.1 + F * 0.31 + F * 0.8 + sub * 1.35); }
    }, SNAP_SLAB);
  }
  function pixelFor(p, t) {
    var lp = t - p.t, px = lp < 0 ? STEPS[0] : STEPS[Math.min(STEPS.length - 1, Math.floor(lp / STEP_T))];
    for (var i = 0; i < sfxs.length; i++) { var dt = t - sfxs[i].t; if (dt >= 0 && dt < 0.3 && sfxs[i].page === p.page) px = Math.max(px, Math.round(FINAL + 26 * (1 - dt / 0.3))); }
    // Small panels resolve finer, so their type stays readable: the final pixel is about 1/40 of the panel height.
    // A tracklist settles at its own finer pixel (a type size / 11: see trackLayout), so its small rows read.
    var fin = p.tl ? p.tl.px : 3, fine = (p.tl ? p.tl.px : clamp(Math.min(p.h, p.w * 0.8) / 40, 3, FINAL)) / FINAL;
    // A tracklist's scale may be a fraction of a CSS px (whole device pixels on a phone: see trackLayout), so it settles
    // on exactly its own scale rather than a rounded one, which would resample its rows.
    px = p.tl && px * fine <= fin + 0.5 ? fin : Math.max(fin, Math.round(px * fine));
    // Resolved: at the final pixel and not re-pixelated by a slam (the shimmer waits for it).
    p.settled = px <= Math.max(fin, Math.round(FINAL * fine));
    return px;
  }
  function drawMark(c, x, y, h) {
    var s = h / 151;
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#1a9ba1'; c.save(); c.translate(6, 6); c.fill(markOutline, 'evenodd'); c.restore(); // flat offset shadow
    c.fillStyle = '#f2f2ef'; c.fill(markOutline, 'evenodd');
    c.fillStyle = '#5fc4c9'; c.fill(markM);
    c.restore();
  }
  // An old-school CD player's display (Matt, 2026-09-27: "make that track 2 look like an old school cd player where it said
  // track 2 but also the title of the song"): a backlit teal LCD with seven-segment TRACK and TIME digits (the time is the
  // song's own), a play mark, and the track's title scrolling as CD text.
  var SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
  function seg7(c, x, y, w, h, d, on) {
    var k = Math.max(1, w * 0.2), hh = h / 2, r = {
      a: [x + k, y, w - 2 * k, k], d: [x + k, y + h - k, w - 2 * k, k], g: [x + k, y + hh - k / 2, w - 2 * k, k],
      f: [x, y + k, k, hh - k], b: [x + w - k, y + k, k, hh - k], e: [x, y + hh, k, hh - k], c: [x + w - k, y + hh, k, hh - k]
    };
    for (var s in r) { var lit = SEG[d] && SEG[d].indexOf(s) >= 0; c.fillStyle = lit ? on : '#5fc4c9'; if (lit || on) c.fillRect(r[s][0], r[s][1], r[s][2], r[s][3]); }
  }
  function digits(c, str, x, y, h, col) {
    var w = h * 0.5, gap = h * 0.14;
    for (var i = 0; i < str.length; i++) {
      var ch2 = str[i];
      if (ch2 === ':') { c.fillStyle = col; c.fillRect(x + w * 0.1, y + h * 0.28, w * 0.22, w * 0.22); c.fillRect(x + w * 0.1, y + h * 0.66, w * 0.22, w * 0.22); x += w * 0.45; continue; }
      seg7(c, x, y, w, h, +ch2, col); x += w + gap;
    }
    return x;
  }
  // The disc, on the CD display and the marquee, after Disc 1 (Matt, 2026-09-28: "journal should be a separate disk on the
  // site playlist"): "DISC 2 * TRACK 01 * ..." on the Journal's comics; Disc 1's tracks read as they always have.
  function discTag(tr) { return tr.disc > 1 ? 'DISC ' + tr.disc + '  •  ' : ''; }
  // The ticker (Matt, 2026-09-27: "add the track ticker inside the main box so it looks like a cd player"): a slim backlit
  // LCD across the foot of a panel, the song's time in seven-segment digits and "TRACK 02 * AGENTIC SYSTEMS" scrolling.
  function drawTicker(c, cw, top, bottom, t, mq) {
    var tr = story.track || { no: '00', title: '' }, sh = bottom - top, lx = cw * 0.05, lw = cw * 0.9, ly = top + sh * 0.1, lh = sh * 0.72;
    c.fillStyle = '#1a9ba1'; c.fillRect(lx, ly, lw, lh);
    c.fillStyle = '#0b1419'; c.fillRect(lx, ly + lh, lw, Math.max(1, sh * 0.05));
    var secs = Math.max(0, Math.floor(t)), time = Math.floor(secs / 60) + ':' + ('0' + secs % 60).slice(-2), dh = lh * 0.62;
    var x0 = digits(c, time, lx + lw * 0.03, ly + (lh - dh) / 2, dh, '#0b1419') + lw * 0.03;
    c.fillStyle = '#0b1419'; c.fillRect(x0, ly + lh * 0.15, Math.max(1, lw * 0.004), lh * 0.7);
    var th = lh * 0.56, text = discTag(tr) + 'TRACK ' + tr.no +'  \u2022  ' + tr.title.toUpperCase() + '  \u2022  ', cx0 = x0 + lw * 0.02;
    c.save(); c.beginPath(); c.rect(cx0, ly, lx + lw - cx0 - lw * 0.02, lh); c.clip();
    c.font = '700 ' + th + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; c.textBaseline = 'middle'; c.fillStyle = '#0b1419';
    var sw = c.measureText(text).width, off = ((mq / 12) * th * 1.6) % sw;
    for (var x = cx0 - off; x < lx + lw; x += sw) c.fillText(text, x, ly + lh * 0.54);
    c.restore(); c.textBaseline = 'alphabetic';
  }
  function drawCd(c, cw, ch, t, mq) {
    var tr = story.track || { no: '00', title: '' }, tall = ch > cw * 0.8;
    var lx = cw * 0.05, ly = ch * (tall ? 0.16 : 0.2), lw = cw * 0.9, lh = ch * (tall ? 0.74 : 0.68);
    c.fillStyle = '#1a9ba1'; c.fillRect(lx, ly, lw, lh);
    c.fillStyle = '#0b1419'; c.fillRect(lx, ly + lh, lw, Math.max(1, ch * 0.02));
    var ink = '#0b1419', lab = Math.max(4, lh * (tall ? 0.085 : 0.14));
    c.textBaseline = 'top'; c.font = '700 ' + lab + 'px "Barlow Condensed", "Arial Narrow", sans-serif';
    var secs = Math.max(0, Math.floor(t)), time = Math.floor(secs / 60) + ':' + ('0' + secs % 60).slice(-2);
    var dh = lh * (tall ? 0.2 : 0.4), px2 = lx + lw * 0.05, py = ly + lh * (tall ? 0.08 : 0.1);
    c.fillStyle = ink; c.fillText('TRACK', px2, py);
    digits(c, tr.no, px2, py + lab * 1.3, dh, ink);
    var tx = tall ? px2 : lx + lw * 0.36, ty = tall ? py + lab * 1.3 + dh + lab : py;
    c.fillStyle = ink; c.fillText('TIME', tx, ty);
    digits(c, time, tx, ty + lab * 1.3, dh, ink);
    // Play mark: blinks on the beat.
    var ps = dh * 0.5, pX = lx + lw * (tall ? 0.72 : 0.84), pY = (tall ? ly + lh * 0.1 : py + lab * 1.3) + (dh - ps) / 2;
    c.fillStyle = ink; c.fillText('PLAY', pX, pY - lab * 1.3);
    if (Math.floor(t / B) % 2 === 0) { c.beginPath(); c.moveTo(pX, pY); c.lineTo(pX + ps * 0.9, pY + ps / 2); c.lineTo(pX, pY + ps); c.closePath(); c.fill(); }
    // CD text: the track's title scrolling along the bottom of the display.
    var th = lh * (tall ? 0.14 : 0.22), tY = ly + lh - th * 1.25, text = tr.title.toUpperCase() + '   \u2022   ';
    c.save(); c.beginPath(); c.rect(lx + lw * 0.04, tY - th * 0.1, lw * 0.92, th * 1.2); c.clip();
    c.font = '700 ' + th + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; c.fillStyle = ink;
    var sw = c.measureText(text).width, off = ((mq / 12) * th * 1.6) % sw;
    for (var x = lx + lw * 0.04 - off; x < lx + lw; x += sw) c.fillText(text, x, tY);
    c.restore(); c.textBaseline = 'alphabetic';
  }
  // A counting figure (Matt, 2026-09-27: "14 apps is the baseline, animate this up slowly as the scene holds. same with
  // 70+ flows but go up in increments of 5. The 3TB migration should start there then increment from 1 to 16 unique
  // migrations"): the panel's pixel type climbs from `from` by `step` every `every` beats, after `after` beats, up to `to`.
  function countText(p, t) {
    var c = p.d.count, lb = (t - p.t) / B - (c.after || 0);
    if (lb < 0) return p.d.pix;
    var n = c.from + c.step * Math.floor(lb / c.every);
    if (c.to != null) n = Math.min(n, c.to);
    return (n === 1 && c.fmt1 ? c.fmt1 : c.fmt).replace('#', n.toLocaleString('en-GB'));
  }
  function drawPanel(p, t) {
    if (!p.cv) return;
    var ptxt = p.d.count ? countText(p, t) : p.d.pix;
    var px = pixelFor(p, t), grow = p.d.chart || p.d.chat ? Math.min(1, (t - p.t) / 0.9) : 1;
    // The marquee steps like an LED sign: 12 moves a second on the motion clock (it holds in a freeze).
    var mt = motion(t), mq = p.d.marquee || p.d.sound || p.d.cd || p.d.ticker || p.d.scroll ? Math.floor(mt * 12) : 0;
    // An image panel shimmers (glimmer above): its frame changes 12 times a second on the motion clock.
    var gk = p.src && p.settled ? String(glimStep(p, mt)) : '';
    // A tracklist redraws when a row lands (and its one-step flash ends), when the disc starts, on the play head's blink
    // and when a row is lit.
    if (p.d.tracks) { var ts = trackState(p, t); gk = 'k' + ts.shown + (ts.live ? 'L' + (Math.floor(mt / B) % 2) + '@' + Math.floor(t) : '') + 'h' + p.hot + (t - p.t - 0.16 - (ts.shown - 1) * ts.step < 0.07 ? 'f' : '') + (p.tl && p.tl.scrolls.indexOf(true) >= 0 ? 's' + Math.floor(mt * 12) : ''); }
    var key = px + ':' + p.w + ':' + p.h + ':' + (p.d.chart || p.d.chat ? grow.toFixed(2) : '') + ':' + mq + ':' + gk + ':' + (ptxt || '') + (p.d.sound ? ':' + soundSay() : '');
    if (key === p.drawn) return;
    var cw = Math.max(2, Math.ceil(p.w / px)), ch = Math.max(2, Math.ceil(p.h / px)), c = p.ctx;
    if (p.cv.width !== cw || p.cv.height !== ch) { p.cv.width = cw; p.cv.height = ch; }
    c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'medium';
    c.fillStyle = '#112126'; c.fillRect(0, 0, cw, ch);
    // A ticker panel keeps its lowest quarter for the CD display strip; the art above uses the rest.
    var chFull = ch; if (p.d.ticker) ch = Math.round(ch * 0.74);
    if (p.src) {
      var im = images[p.src];
      if (!im || !im.complete || !im.naturalWidth) return;
      // The posterized grid is drawn once per pixel size and kept; each frame only re-lights it (glimmer).
      var bk = cw + 'x' + ch;
      if (p.baseKey !== bk || !p.base || p.readBlocked) {
        c.fillStyle = '#000'; c.fillRect(0, 0, cw, ch); // letterbox reads as the image's darkest, the flat panel colour
        var ir = im.naturalWidth / im.naturalHeight, pr = cw / ch, dw, dh;
        if ((p.fit === 'cover') === (ir > pr)) { dh = ch; dw = ch * ir; } else { dw = cw; dh = cw / ir; }
        c.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        // Native file previews may draw a local image but forbid reading its pixels.
        // Keep the small pixelated image visible; HTTP retains its palette/glimmer.
        if (!p.readBlocked) {
          try { p.base = posterize(c, cw, ch); }
          catch (e) { if (e.name !== 'SecurityError') throw e; p.readBlocked = true; p.base = null; p.work = null; }
        }
        p.baseKey = bk;
      }
      // While it resolves or a slam re-pixelates it (0.3 s), the chunky frame is shown plain: it changes every frame then.
      if (p.base) { if (p.settled) glimmer(p, c, cw, ch, mt); else c.putImageData(p.base, 0, 0); }
    } else if (p.d.tracks) {
      // Drawn at one font pixel per canvas pixel into its own buffer; while the panel resolves, the chunky frames are
      // that buffer drawn small.
      if (p.tl) {
        var tb = p.tbuf || (p.tbuf = document.createElement('canvas')), tbw = Math.ceil(p.w / p.tl.u), tbh = Math.ceil(p.h / p.tl.u);
        if (tb.width !== tbw || tb.height !== tbh) { tb.width = tbw; tb.height = tbh; }
        drawTracks(p, tb.getContext('2d'), t, mt);
        c.imageSmoothingEnabled = px > p.tl.u; c.drawImage(tb, 0, 0, cw, ch);
      }
    } else if (p.d.cd) {
      drawCd(c, cw, ch, t, mq);
    } else if (p.d.scroll && ptxt) {
      // A landing page's cover (Matt, 2026-09-28: "swap the "Track 02" ... with the section name so the section name scrolls
      // on a marquee"): the MTW mark, then the pixel type running as the marquee does (first word teal-light, the rest
      // paper, a flat ink shadow, teal rules), stepped 12 times a second; the name lands still and reads for two beats of
      // the motion clock, then runs.
      // Wide: the mark, then the strip beside it. Tall (a phone): the mark above, the strip across the lower part.
      var sl = cw * 0.05, stop = 0, sbh = ch, tall = ch > cw * 0.8;
      if (p.d.mark && tall) { var smt = ch * 0.4; drawMark(c, (cw - smt * 115 / 151) / 2, ch * 0.1, smt); sl = 0; stop = ch * 0.58; sbh = ch * 0.34; }
      else if (p.d.mark) { var smh = ch * 0.62; drawMark(c, sl, (ch - smh) / 2, smh); sl += smh * (115 / 151) + cw * 0.04; }
      else sl = 0;
      var swd = ptxt.split(' '), shd = swd[0], sbd = (swd.length > 1 ? ' ' + swd.slice(1).join(' ') : '') + '  \u2022  ';
      var ssz = Math.min(sbh * 0.62, cw * (tall ? 0.24 : 0.14));
      // The shared marquee strip (strip, above): the tracklist's rows are drawn by the same renderer.
      strip(c, { x: sl, y: stop, w: cw - sl, h: sbh, tx: sl + (tall ? cw * 0.05 : 0), my: stop + sbh * 0.52, head: shd, body: sbd, size: ssz, hc: TK.tealLight, bc: TK.paper, rule: Math.max(1, sbh * 0.06), run: mq / 12 - p.t - 2 * B, speed: ssz * 1.8 });
    } else if (p.d.marquee || p.d.sound) {
      // An 8-bit scrolling marquee: "TRACK 02: AGENTIC SYSTEMS  *  ..." (or the sound prompt) in pixel type, sliding left a
      // pixel step at a time.
      var tr = story.track || { no: '', title: '' }, head = (tr.disc > 1 ? 'DISC ' + tr.disc + ' ' : '') + 'TRACK ' + tr.no + ':', body = ' ' + tr.title.toUpperCase() + (typeof p.d.marquee === 'string' ? '  \u2022  ' + p.d.marquee.toUpperCase() : '') + '  \u2022  ';
      if (p.d.sound) { if (soundSay() === 'on') { head = 'SOUND'; body = ' ON  \u2022  '; } else { head = TOUCH ? 'TAP' : 'CLICK'; body = ' THE SCREEN FOR SOUND  \u2022  '; } }
      // Type sized by the strip's height, but never above a seventh of its width, so a phone still reads whole words.
      var msz = Math.min(ch * 0.62, cw * 0.14); c.font = '700 ' + msz + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; c.textBaseline = 'middle';
      var hw = c.measureText(head).width, seg = hw + c.measureText(body).width, speed = msz * 1.8, off = ((mq / 12) * speed) % seg, msh = Math.max(1, Math.round(msz * 0.06));
      c.fillStyle = '#1a9ba1'; c.fillRect(0, 0, cw, Math.max(1, ch * 0.06)); c.fillRect(0, ch - Math.max(1, ch * 0.06), cw, Math.max(1, ch * 0.06));
      for (var mx0 = -Math.round(off); mx0 < cw; mx0 += seg) {
        c.fillStyle = '#0b1419'; c.fillText(head + body, mx0 + msh, ch * 0.52 + msh);
        c.fillStyle = '#5fc4c9'; c.fillText(head, mx0, ch * 0.52);
        c.fillStyle = '#f2f2ef'; c.fillText(body, mx0 + hw, ch * 0.52);
      }
    } else if (p.d.chat) {
      // A pixel chat window: alternating bubbles of 'text' bars and a typing indicator, appearing as the panel lands.
      var m = cw * 0.08, bh = ch * 0.14, gy = ch * 0.045, y0 = ch * 0.24, n2 = 3;
      for (var bI = 0; bI < n2; bI++) {
        if (grow * (n2 + 1) < bI + 1) break;
        var right = bI % 2 === 1, bw2 = cw * (right ? 0.5 : 0.62), bx = right ? cw - m - bw2 : m, by = y0 + bI * (bh + gy);
        c.fillStyle = right ? '#5fc4c9' : '#1a9ba1'; c.fillRect(bx, by, bw2, bh);
        c.fillRect(right ? bx + bw2 - bh * 0.5 : bx + bh * 0.1, by + bh, bh * 0.4, bh * 0.35); // the tail
        c.fillStyle = right ? '#0b1419' : '#f2f2ef';
        for (var ln = 0; ln < 2; ln++) c.fillRect(bx + bw2 * 0.1, by + bh * (0.28 + ln * 0.3), bw2 * (ln ? 0.5 : 0.78), Math.max(1, bh * 0.14));
      }
      if (grow >= 1) { c.fillStyle = '#f2f2ef'; for (var dI = 0; dI < 3; dI++) c.fillRect(m + dI * bh * 0.45, y0 + n2 * (bh + gy) + bh * 0.2, bh * 0.25, bh * 0.25); }
    } else if (p.d.chart) {
      var n = 7, gap = cw * 0.03, bw = (cw * 0.8 - gap * (n - 1)) / n;
      for (var i = 0; i < n; i++) {
        var hgt = ch * (0.18 + 0.5 * hash(i, 3, 5) + i * 0.02) * out3(grow * 1.4 - i * 0.06);
        c.fillStyle = i === n - 1 ? '#f2f2ef' : i % 2 ? '#1a9ba1' : '#5fc4c9';
        c.fillRect(cw * 0.1 + i * (bw + gap), ch * 0.86 - hgt, bw, hgt);
      }
      c.fillStyle = '#f2f2ef'; c.fillRect(cw * 0.08, ch * 0.86, cw * 0.84, Math.max(1, ch * 0.012));
    } else {
      var left = 0.05 * cw, stack = p.d.mark && ptxt && ch > cw * 0.8, textTop = 0;
      // Beside the type in a wide panel; above it in a tall one.
      if (stack) { var sh2 = ch * 0.42; drawMark(c, (cw - sh2 * 115 / 151) / 2, ch * 0.12, sh2); textTop = ch * 0.6; }
      else if (p.d.mark) { var mh = ch * (ptxt ? 0.62 : 0.8); drawMark(c, left, (ch - mh) / 2, mh); left += mh * (115 / 151) + cw * 0.04; }
      if (ptxt) {
        var words = ptxt.split(' '), avail = cw - left - cw * 0.05, size = stack ? ch * 0.16 : ch * (p.d.small ? 0.5 : 0.62);
        c.font = '700 ' + size + 'px "Barlow Condensed", "Arial Narrow", sans-serif';
        var width = c.measureText(ptxt).width;
        if (width > avail) { size *= avail / width; c.font = '700 ' + size + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; width = c.measureText(ptxt).width; }
        c.textBaseline = 'middle';
        // Two lines when that makes the type clearly bigger (a narrow panel): split at the middle word. Beside the mark
        // too (2026-09-28: the homepage cover's MAKING THINGS WORK. on a phone), where the caption sits over the mark, not
        // the type; a panel whose type is limited by its height (every service cover) never wraps.
        var lines = [words], lsize = size;
        if (words.length > 1 && !stack) {
          var half = Math.ceil(words.length / 2), l1 = words.slice(0, half), l2 = words.slice(half);
          var f2 = function (z) { c.font = '700 ' + z + 'px "Barlow Condensed", "Arial Narrow", sans-serif'; return Math.max(c.measureText(l1.join(' ')).width, c.measureText(l2.join(' ')).width); };
          var s2 = Math.min(ch * (p.d.cap && !p.d.mark ? 0.3 : 0.36), size * avail / Math.max(1, f2(size)));
          if (s2 > size * 1.25) { lines = [l1, l2]; lsize = s2; }
        }
        c.font = '700 ' + lsize + 'px "Barlow Condensed", "Arial Narrow", sans-serif';
        var sh = Math.max(1, Math.round(lsize * 0.06)), y0 = stack ? textTop + lsize * 0.6 : ch * (p.d.cap ? 0.56 : 0.5) - (lines.length - 1) * lsize * 0.5, wi = 0;
        lines.forEach(function (ln, li) {
          var txt = ln.join(' '), lw = c.measureText(txt).width, x = p.d.mark && !stack ? left : (cw - lw) / 2, y = y0 + li * lsize * 0.95, cx = x;
          c.fillStyle = '#1a9ba1'; c.fillText(txt, x + sh, y + sh);
          ln.forEach(function (w) { c.fillStyle = wi++ === 0 ? '#f2f2ef' : '#5fc4c9'; c.fillText(w, cx, y); cx += c.measureText(w + ' ').width; });
        });
      }
    }
    if (p.d.ticker) drawTicker(c, cw, ch, chFull, t, mq);
    p.art.style.setProperty('--px', px + 'px');
    p.drawn = key;
  }

  /* ---------- Per-frame DOM ---------- */
  function setCss(o, css, apply) { if (o.css === css) return; o.css = css; apply(); }
  function typed(chars, lp, rate) {
    var n = lp <= 0 ? 0 : Math.min(chars.length, Math.ceil(lp * rate));
    if (chars.n === n) return; chars.n = n;
    for (var i = 0; i < chars.length; i++) chars[i].classList.toggle('is-on', i < n);
  }
  function renderPanel(p, t, dimmed) {
    var lp = t - p.t;
    // The sound box shows from its `at` to its `until` whatever the sound state (Matt, 2026-09-28: "ensure the click to
    // play sound box is loaded no matter if the user has sound or not"; before, it showed only while the browser held
    // the music back, leaving a gap on the cover). It asks for a click while the music is held back or muted and says
    // SOUND ON while it is audible (soundSay). `until` takes a panel off before its page ends.
    if (p.d.until != null && t >= (p.page.b + p.d.until) * B) lp = -1;
    if (p.d.sound) { var say = soundSay(); if (p.el.dataset.say !== say) p.el.dataset.say = say; }
    if (lp < 0) { setCss(p, 'off', function () { p.el.style.opacity = '0'; }); return; }
    var pop = c01(lp / 0.1), s = 1.07 - 0.07 * out3(pop), dim = dimmed ? 0.55 : 1;
    setCss(p, (pop * dim).toFixed(2) + s.toFixed(3), function () { p.el.style.opacity = (Math.min(1, pop * 2) * dim).toFixed(3); p.el.style.transform = s === 1 ? '' : 'scale(' + s.toFixed(4) + ')'; });
    // The pen inks the frame round its perimeter; the line stays, like ink.
    var inkP = out3(lp / 0.3);
    if (p.inkK !== inkP) { p.inkK = inkP; p.ink.style.strokeDashoffset = (1 - inkP).toFixed(3); }
    drawPanel(p, t);
    if (p.cap) {
      var cl = lp - 0.16; p.cap.style.opacity = cl > 0 ? '1' : '0';
      p.cap.style.transform = cl > 0 && cl < 0.08 ? 'scale(' + (0.9 + 0.1 * cl / 0.08).toFixed(3) + ')' : '';
      typed(p.capChars, cl, 95);
    }
    if (p.cap2) { var c2 = t - p.t2; p.cap2.style.opacity = c2 > 0 ? '1' : '0'; p.cap2.style.transform = c2 > 0 && c2 < 0.1 ? 'scale(' + (1.3 - 0.3 * c2 / 0.1).toFixed(3) + ') rotate(-2deg)' : 'rotate(-2deg)'; typed(p.cap2Chars, c2, 75); }
    if (p.name) p.name.style.opacity = lp > 0.12 ? '1' : '0';
    if (p.tag) p.tag.style.opacity = lp > 0.16 ? '1' : '0';
  }
  var BLAST = 0.62; // seconds of pixel explosion after a slab's hold
  var CARD_MIN = 0.57; // seconds: the shortest chapter card flash, the homepage's (0.95 beat at 100 BPM)
  function renderSfx(S, t, mt) {
    var lp = t - S.t, on = lp >= 0 && lp < S.len;
    if (!on) { setCss(S, 'off', function () { S.el.style.opacity = '0'; }); return; }
    drawSfx(S, lp);
    S.debris = null; // rebuilt from the final sprite when the slab explodes
    // Keep the whole slab on the page: its centre moves in from the edges by half its size.
    var cw2 = parseFloat(S.cv.style.width) || 0, ch2 = parseFloat(S.cv.style.height) || 0, f = S.page.flip;
    var cx = clamp((f ? S.y : S.x) * book.bw, Math.min(cw2 / 2, book.bw / 2), Math.max(book.bw - cw2 / 2, book.bw / 2));
    var cy = clamp((f ? S.x : S.y) * book.bh, Math.min(ch2 / 2, book.bh / 2), Math.max(book.bh - ch2 / 2, book.bh / 2));
    S.cx = book.bx + cx; S.cy = book.by + cy;
    S.el.style.left = cx.toFixed(0) + 'px'; S.el.style.top = cy.toFixed(0) + 'px';
    // Stop motion: the slab moves on twos (12 fps) with a little boil, like a hand-drawn frame.
    var step = S.still ? 0 : Math.floor((mt - S.t) * 12), boil = S.still ? 0 : (hash(step, 1, 3) - 0.5) * 2;
    var sc = 0.2 + 0.8 * backOut(lp / 0.18);
    S.scale = sc; S.rot = S.r + boil;
    setCss(S, sc.toFixed(3) + step, function () { S.el.style.opacity = '1'; S.el.style.transform = 'translate(-50%,-50%) rotate(' + S.rot.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')'; });
  }
  // The explosion: every pixel of the slab's sprite becomes a square that flies off, falls and fades (Matt, 2026-09-26:
  // "explode them pixelated style"). Deterministic from time, so it seeks like everything else.
  function debrisOf(S) {
    if (S.debris) return S.debris;
    var c = S.sp.ctx; if (!c) return (S.debris = []);
    var w = S.cv.width, h = S.cv.height, px = (parseFloat(S.cv.style.width) || w) / w, d = c.getImageData(0, 0, w, h).data, out = [];
    var step = Math.max(1, Math.round(Math.sqrt(w * h / 1400)));
    for (var y = 0; y < h; y += step) for (var x = 0; x < w; x += step) {
      var i = (y * w + x) * 4; if (d[i + 3] < 128) continue;
      var col = d[i] < 60 ? RGB.ink : d[i] > 200 && d[i + 2] > 200 && d[i + 1] > 200 ? RGB.white : d[i] > 60 ? RGB.tealLight : RGB.teal;
      var ox = (x - w / 2) * px, oy = (y - h / 2) * px, a = Math.atan2(oy, ox) + (hash(x, y, 21) - 0.5) * 0.9, sp = 280 + 620 * hash(x, y, 22);
      out.push({ ox: ox, oy: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 260 * hash(x, y, 23), c: col, s: px * step, life: 0.45 + 0.35 * hash(x, y, 25) });
    }
    return (S.debris = out);
  }
  function drawDebris(ctx, t) {
    var any = false;
    for (var k = 0; k < sfxs.length; k++) {
      var S = sfxs[k], dt = t - S.t - S.len;
      if (dt < 0 || dt > BLAST || S.cx == null) continue;
      any = true;
      var parts = debrisOf(S), rr = (S.rot || 0) * Math.PI / 180, cs = Math.cos(rr), sn = Math.sin(rr), sc = S.scale || 1;
      for (var q = 0; q < parts.length; q++) {
        var P = parts[q], life = c01(dt / (P.life * BLAST / 0.8)); if (life >= 1) continue;
        var bx = (P.ox * cs - P.oy * sn) * sc, by = (P.ox * sn + P.oy * cs) * sc;
        var x = S.cx + bx + P.vx * dt, y = S.cy + by + P.vy * dt + 900 * dt * dt;
        put(P.c, 1 - life * life, Math.round(x / 3) * 3, Math.round(y / 3) * 3);
      }
      flush(ctx, parts.length ? parts[0].s : 4);
    }
    return any;
  }
  var liveIndex = -2, closeLive = false;
  function render(t) {
    var beat = t / B, cur = null;
    for (var i = 0; i < pages.length; i++) if (beat >= pages[i].b && beat < pages[i].b + pages[i].l) cur = pages[i];
    var mt = motion(t), mbeat = mt / B;
    var inClose = !!(cur && cur.close);
    if ((cur ? cur.index : -1) !== liveIndex) {
      pages.forEach(function (P) { P.el.classList.toggle('is-live', P === cur); });
      liveIndex = cur ? cur.index : -1;
      stage.setAttribute('data-ground', cur ? cur.ground : 'ink');
      cornerNo.textContent = cur && cur.chapter ? 'No. ' + cur.chapter : '';
    }
    if (inClose !== closeLive) { closeEl.classList.toggle('is-live', inClose); closeLive = inClose; }
    corner.style.opacity = cur && cur.chapter && beat >= cur.b + 1 ? '1' : '0';
    G.teal = !!(cur && cur.ground === 'teal'); G.trails.length = 0;
    G.ember = cur ? cur.ember : 1;
    G.field = cur && cur.field ? mt - cur.b * B : -1;
    G.planes = cur && cur.field ? mt - (cur.b + (cur.planes || 8)) * B : -1;
    // Camera: a slow push through each page, a kick on every landing, a stepped shake on SFX hits.
    var kick = 0, shx = 0, shy = 0;
    for (var e = 0; e < events.length; e++) {
      var dt = mt - events[e].t;
      if (dt >= 0 && dt < 0.5) {
        kick += events[e].kick * Math.exp(-dt * 12);
        if (events[e].shake && dt < 0.3) { var st = Math.floor(dt * 24); shx += (hash(st, 7, 1) - 0.5) * events[e].shake * (1 - dt / 0.3); shy += (hash(st, 8, 1) - 0.5) * events[e].shake * (1 - dt / 0.3); }
      }
    }
    if (cur) {
      var push = 1 + 0.03 * ((mbeat - cur.b) / cur.l) + kick;
      cur.el.style.transform = 'translate(' + shx.toFixed(1) + 'px,' + shy.toFixed(1) + 'px) scale(' + push.toFixed(4) + ')';
      if (cur.links) cur.links.style.transform = cur.el.style.transform; // the links ride the page's camera
      for (var k = 0; k < cur.panels.length; k++) {
        var p = cur.panels[k];
        renderPanel(p, t, false);
        var lp = t - p.t;
        if (lp >= 0 && lp < 0.9) G.trails.push({ p: p, lp: lp, push: push, shx: shx, shy: shy });
      }
    }
    // A way in can be clicked, tapped or focused only while its cell shows: from its name bar landing until its `until`
    // or the cut that closes its page, whichever comes first.
    for (var li = 0; li < links.length; li++) {
      var L = links[li], lEnd = (L.page.b + L.page.l) * B - CUT_IN;
      if (L.d.until != null) lEnd = Math.min(lEnd, (L.page.b + L.d.until) * B);
      var lOn = L.page === cur && t - L.t > 0.12 && t < lEnd;
      if (L.linkOn !== lOn) { L.linkOn = lOn; L.link.classList.toggle('is-on', lOn); if (!lOn) L.el.classList.remove('is-hot'); }
    }
    // A tracklist row's link: live once its row has landed and the disc plays (`tracks.live`, after the homepage's sound
    // box, so a click before then is still the click for sound), until the cut that closes its page.
    for (var ri = 0; ri < rowLinks.length; ri++) {
      var R = rowLinks[ri], RP = R.p, rs = RP.page === cur ? trackState(RP, t) : null;
      var rOn = !!rs && rs.live && R.ri < rs.shown && t < (RP.page.b + (RP.d.until != null ? RP.d.until : RP.page.l)) * B - CUT_IN;
      if (R.on !== rOn) { R.on = rOn; R.a.classList.toggle('is-on', rOn); if (!rOn && RP.hot === R.ri) { RP.hot = -1; RP.el.setAttribute('data-hot', -1); } }
    }
    sfxs.forEach(function (S) { renderSfx(S, t, mt); });
    pages.forEach(function (P) {
      if (!P.title) return;
      // The card holds for a beat, longer when the song stops dead under it (the freeze extends it).
      // Its slam-in runs on real time (la): a freeze on the card's first beat held it in its squashed first frame, which
      // read as type stretched sideways (Matt, 2026-09-27: "the cycle label font looks stretched horizontally").
      // It never flashes for less than the homepage's 0.95 beat at 100 BPM (0.57 s): on a fast song 0.95 beat was too brief
      // to read (0.34 s at 165.75 BPM, Track 07); at 100 BPM and slower nothing changes.
      var lp = mt - P.b * B, la = t - P.b * B, on = t >= P.b * B && (lp < B * 0.95 || la < CARD_MIN);
      setCss(P, on ? String(Math.floor(la * 24)) : 'off', function () {
        if (!on) { P.title.style.opacity = '0'; return; }
        var sc = 1.3 - 0.3 * out3(la / 0.09), echo = out3(la / 0.3);
        P.title.style.opacity = '1';
        P.title.style.transform = 'translateY(-50%) scaleY(' + (la < 0.05 ? 0.4 + la / 0.05 * 0.6 : 1).toFixed(3) + ')';
        P.title.firstChild.style.transform = 'scale(' + sc.toFixed(3) + ')';
        P.title.lastChild.style.transform = 'translate(' + (echo * 16).toFixed(1) + 'px,' + (-echo * 10).toFixed(1) + 'px)';
      });
    });
    if (inClose) {
      drawHeadPx(t);
      // The heading's lines on 0 and 1.5, the lede on 3, each popping in; the image only once the type is smooth.
      var lands = closeHeads.length > 1 ? [0, 1.5] : [0];
      closeHeads.concat(closeLede ? [closeLede] : []).forEach(function (part, i) {
        var lp = t - (closeT + (i < lands.length ? lands[i] : 3) * B);
        part.style.opacity = lp > 0 ? '1' : '0';
        part.style.transform = lp > 0 && lp < 0.12 ? 'scale(' + (1.14 - 0.14 * out3(lp / 0.12)).toFixed(3) + ')' : '';
      });
      // A hologram is screened onto the ground (mix-blend-mode on its img): an opacity on its figure would isolate the
      // blend and show its black box while it fades (lesson 5), so the figure switches on and the img itself fades.
      var fade = inOut(c01(((t - closeT) / B - ART_AT) / ART_FADE)).toFixed(3);
      closeArt.forEach(function (part) {
        var im = part.classList.contains('rl-close__art') ? part.querySelector('img') : null;
        if (im) { part.style.opacity = +fade > 0 ? '1' : '0'; im.style.opacity = fade; } else part.style.opacity = fade;
      });
    }
    drawBack(mt);
    drawFront(t);
    if (metro) metronome(t);
    if (progress) progress.update(t);
  }

  /* ---------- Back canvas: the Grid Background, the campfire and the pen's trail ---------- */
  var RGB = { teal: [26, 155, 161], tealLight: [95, 196, 201], muted: [185, 195, 196], ink: [11, 20, 25], white: [242, 242, 239] };
  var PALETTE = [RGB.teal, RGB.tealLight, RGB.muted, RGB.ink, RGB.white];
  PALETTE.forEach(function (c, i) { c.id = i; });
  var G = { ember: 1, teal: false, trails: [], dim: 1 };
  var buckets = [], used = [];
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')'; }
  function look(r, teal) {
    if (teal) return r < 0.55 ? { c: RGB.ink, a: 0.22 } : r < 0.85 ? { c: RGB.white, a: 0.08 } : { c: RGB.white, a: 0.18 };
    if (r < 0.60) return { c: RGB.teal, a: 0.16 };
    if (r < 0.82) return { c: RGB.muted, a: 0.07 };
    if (r < 0.95) return { c: RGB.teal, a: 0.34 };
    return { c: RGB.tealLight, a: 0.46 };
  }
  function put(col, a, x, y) {
    var lvl = Math.min(40, Math.round(a * G.dim * 40)); if (lvl < 1) return;
    var key = col.id * 41 + lvl, bk = buckets[key];
    if (!bk) { bk = buckets[key] = []; used.push(key); }
    bk.push(x, y);
  }
  function flush(ctx, size) {
    for (var u = 0; u < used.length; u++) {
      var key = used[u], list = buckets[key], cc = PALETTE[(key / 41) | 0];
      ctx.fillStyle = rgba(cc, (key % 41) / 40);
      ctx.beginPath();
      for (var m = 0; m < list.length; m += 2) ctx.rect(list[m], list[m + 1], size, size);
      ctx.fill();
      buckets[key] = null;
    }
    used.length = 0;
  }
  var cellA = null, cellC = null;
  function drawBack(t) {
    var ctx = bctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    for (var gx = 0; gx <= W; gx += pitch) { ctx.moveTo(Math.round(gx) + 0.5, 0); ctx.lineTo(Math.round(gx) + 0.5, H); }
    for (var gy = 0; gy <= H; gy += pitch) { ctx.moveTo(0, Math.round(gy) + 0.5); ctx.lineTo(W, Math.round(gy) + 0.5); }
    ctx.strokeStyle = G.teal ? 'rgba(255,255,255,0.08)' : 'rgba(185,195,196,0.05)'; ctx.lineWidth = 1; ctx.stroke();
    var cols = Math.ceil(W / pitch) + 1, rows = Math.ceil(H / pitch) + 1, size = pitch * 0.76, pad = (pitch - size) / 2;
    if (!cellA || cellA.length !== cols * rows) { cellA = new Float32Array(cols * rows); cellC = new Int8Array(cols * rows); }
    cellA.fill(0); cellC.fill(-1);
    function light(ci, ri, a, c) { if (ci < 0 || ri < 0 || ci >= cols || ri >= rows) return; var k = ri * cols + ci; if (a > cellA[k]) { cellA[k] = a; cellC[k] = c.id; } }
    // Ambient tiles, and the campfire: a glow straight up from the bottom rows, flickering per column on the beat.
    var beatPulse = Math.pow(1 - ((t / B) % 1), 3);
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var a0 = hash(x, y, 1), b0 = hash(x, y, 2), r0 = hash(x, y, 3);
      if (a0 < 0.27) { var lk = look(b0, G.teal), al = lk.a; if (r0 < 0.05) al += 0.14 * (0.5 - 0.5 * Math.cos((t + r0 * 99) / (4 + r0 * 30) * 6.283)); light(x, y, al, lk.c); }
      var fromBottom = (rows - 1 - y) / rows;
      if (fromBottom < 0.32) {
        var flick = 0.5 + 0.5 * Math.sin(t * 7.3 + x * 1.7 + Math.sin(t * 2.1 + x * 0.6) * 2) * Math.sin(t * 3.1 + x * 0.9);
        var fire = Math.pow(1 - fromBottom / 0.32, 2.2) * (0.14 + 0.22 * flick + 0.1 * beatPulse) * G.ember;
        if (r0 < 0.62 && fire > 0.02) light(x, y, fire, G.teal ? RGB.white : fire > 0.28 ? RGB.tealLight : RGB.teal);
      }
    }
    // Embers: squares that rise off the fire, snapped to the tile grid, drifting and fading.
    var N = Math.round(cols * 0.7);
    for (var e = 0; e < N; e++) {
      var life = 2.4 + hash(e, 1, 9) * 2.6, ph = (t / life + hash(e, 2, 9)) % 1;
      var ex = hash(e, 3, 9) * W + Math.sin(t * 1.3 + e) * pitch * 1.2 * ph, ey = H - ph * H * (0.5 + 0.45 * hash(e, 4, 9));
      light(Math.floor(ex / pitch), Math.floor(ey / pitch), (1 - ph) * 0.7 * G.ember, G.teal ? RGB.white : ph < 0.3 ? RGB.tealLight : RGB.teal);
    }
    // Field of dreams: the grid grows into rows of stalks from the bottom, swaying on the beat.
    if (G.field >= 0) {
      for (var fx = 0; fx < cols; fx++) {
        if (hash(fx, 7, 7) > 0.78) continue;
        var grow = out3((G.field - hash(fx, 6, 6) * 0.9) / 1.3), tall = Math.round(rows * (0.2 + 0.2 * hash(fx, 5, 5)) * grow);
        for (var fy = 0; fy < tall; fy++) {
          var up = fy / Math.max(1, tall), sway = Math.round(Math.sin(t * 2.6 + fx * 0.45) * up * up * 1.6);
          var tip = fy >= tall - 1;
          light(fx + sway, rows - 1 - fy, tip ? 0.85 : 0.28 + 0.2 * hash(fx, fy, 8), G.teal ? RGB.white : tip ? RGB.tealLight : RGB.teal);
        }
      }
    }
    // Let your ideas fly: paper planes of tiles cross the field, leaving a fading trail.
    if (G.planes >= 0) {
      // A paper dart, nose to the right: fuselage, a swept upper wing and a short lower fin.
      var PLANE = [[0, 0], [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-1, -1], [-2, -1], [-3, -1], [-3, -2], [-4, -2], [-5, -2], [-5, -3], [-2, 1], [-3, 1], [-4, 1], [-5, 2]];
      for (var pl = 0; pl < 5; pl++) {
        var pt = G.planes - pl * 0.32; if (pt < 0) continue;
        var pxp = -4 * pitch + pt * (W / 2.4), pyp = H * (0.2 + 0.5 * hash(pl, 1, 4)) - pt * H * 0.08 + Math.sin(pt * 3 + pl) * pitch * 1.4;
        var pcx = Math.floor(pxp / pitch), pcy = Math.floor(pyp / pitch);
        for (var tr2 = 6; tr2 < 20; tr2++) light(pcx - tr2, pcy + Math.round(Math.sin((pt - tr2 * 0.05) * 3 + pl) * 0.8), 0.55 * (1 - tr2 / 20), RGB.tealLight);
        PLANE.forEach(function (q) { light(pcx + q[0], pcy + q[1], 0.95, RGB.white); });
      }
    }
    // The pen's trail: tiles light up behind the pen round each new panel's frame, then cool.
    var cxm = book.bx + book.bw / 2, cym = book.by + book.bh / 2;
    G.trails.forEach(function (tr) {
      var p = tr.p, per = 2 * (p.w + p.h), drawn = out3(tr.lp / 0.3) * per;
      for (var s = 0; s <= drawn; s += pitch * 0.5) {
        var px, py;
        if (s < p.w) { px = s; py = 0; } else if (s < p.w + p.h) { px = p.w; py = s - p.w; } else if (s < 2 * p.w + p.h) { px = p.w - (s - p.w - p.h); py = p.h; } else { px = 0; py = p.h - (s - 2 * p.w - p.h); }
        var X = cxm + (p.x + px - cxm) * tr.push + tr.shx, Y = cym + (p.y + py - cym) * tr.push + tr.shy;
        var age = tr.lp - (s / per) * 0.3, a = Math.exp(-Math.max(0, age) * 4) * 0.85;
        light(Math.floor(X / pitch), Math.floor(Y / pitch), a, G.teal ? RGB.white : RGB.tealLight);
      }
    });
    for (var k = 0; k < cellA.length; k++) if (cellC[k] >= 0) put(PALETTE[cellC[k]], cellA[k], (k % cols) * pitch + pad, ((k / cols) | 0) * pitch + pad);
    flush(ctx, size);
  }

  /* ---------- Front canvas: page cuts in straight sweeps ---------- */
  var DIRS = ['lr', 'bt', 'rl', 'tb', 'diag'], frontDirty = false, CUT_IN = B * 0.4, CUT_OUT = B * 0.55;
  var cuts = pages.map(function (P) { return P.b * B; });
  function drawFront(t) {
    var best = null;
    for (var i = 0; i < cuts.length; i++) {
      var dt = t - cuts[i];
      // A looping story wipes from its last page back to the cover; a held one (holdEnd) never wraps, or the held final
      // frame would freeze mid-wipe with the cover's tiles over the close (found 2026-09-26 on the Agentic Systems hold).
      if (!HOLD_END) { if (dt < -LOOP / 2) dt += LOOP; else if (dt > LOOP / 2) dt -= LOOP; }
      if (dt >= -CUT_IN && dt <= CUT_OUT) { best = { dt: dt, dir: DIRS[i % DIRS.length] }; break; }
    }
    var blasting = sfxs.some(function (S) { var dt = t - S.t - S.len; return dt >= 0 && dt <= BLAST; });
    if (!best && !blasting) { if (frontDirty) { fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.clearRect(0, 0, front.width, front.height); frontDirty = false; } return; }
    var ctx = fctx; frontDirty = true;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (best) {
      var covering = best.dt < 0, p = covering ? 1 + best.dt / CUT_IN : best.dt / CUT_OUT;
      var cols = Math.ceil(W / pitch) + 1, rows = Math.ceil(H / pitch) + 1;
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var u = x / cols, v = y / rows, k;
        switch (best.dir) { case 'rl': k = 1 - u; break; case 'bt': k = 1 - v; break; case 'tb': k = v; break; case 'diag': k = (u + v) / 2; break; default: k = u; }
        var th = k * 0.72 + hash(x, y, 7) * 0.28;
        var a = covering ? c01((p * 1.3 - th) / 0.12) : 1 - c01((p * 1.3 - th) / 0.12);
        if (a <= 0.02) continue;
        var h = hash(x, y, 9), c = h < 0.1 ? RGB.teal : h < 0.13 ? RGB.tealLight : RGB.ink;
        put(c, a, x * pitch - 0.5, y * pitch - 0.5);
      }
      flush(ctx, pitch + 1);
    }
    if (blasting) drawDebris(ctx, t);
  }

  /* ---------- ?beat: a metronome to confirm a song's beat map by eye and ear ---------- */
  // A square flashes on every beat (larger on each 16-beat phrase start) and shows the beat number; ?beat=tick also
  // clicks each beat over the music. If the flash leads or trails the kick, the story's offset is wrong.
  var metro = q.has('beat') ? el('div', '', stage) : null, metroBeat = -1, tickCtx = null;
  if (metro) metro.style.cssText = 'position:absolute;z-index:6;left:12px;top:' + (parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64) + 'px;padding:6px 9px;font:700 16px var(--display);background:#5fc4c9;color:#0b1419;opacity:.15';
  function metronome(t) {
    var bIdx = Math.floor(t / B), f = t / B - bIdx;
    metro.style.opacity = (0.15 + 0.85 * Math.max(0, 1 - f * 4)).toFixed(2);
    metro.style.transform = bIdx % 16 === 0 ? 'scale(1.6)' : '';
    if (bIdx === metroBeat) return;
    metroBeat = bIdx; metro.textContent = String(bIdx);
    if (q.get('beat') === 'tick') {
      try { tickCtx = tickCtx || new (window.AudioContext || window.webkitAudioContext)(); var o = tickCtx.createOscillator(), g = tickCtx.createGain(); o.frequency.value = bIdx % 4 ? 1400 : 2000; g.gain.setValueAtTime(0.25, tickCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, tickCtx.currentTime + 0.05); o.connect(g).connect(tickCtx.destination); o.start(); o.stop(tickCtx.currentTime + 0.06); } catch (e) {}
    }
  }

  /* ---------- Clock and music ---------- */
  // The mixtape (Matt, 2026-09-26: "once all the pages have these we will be able to navigate through like a self directed
  // mix tape"): every page is a track. Mute and whether sound has been unlocked carry across pages for the session.
  var TOUCH = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var MIX = 'mtw-mixtape';
  function mixGet() { try { return JSON.parse(sessionStorage.getItem(MIX) || '{}') || {}; } catch (e) { return {}; } }
  function mixSet(o) { try { var m = mixGet(); for (var k in o) m[k] = o[k]; sessionStorage.setItem(MIX, JSON.stringify(m)); } catch (e) {} }
  // One sound setting for the site (Matt, 2026-09-27: "the mute button in nav must reflect if audio is enabled (link
  // scene audio to button click audio)"): the nav's Sound Toggle (tactile.js, localStorage 'mtw-sound') and this music
  // mute are the same state. A visitor who turned sound off hears no music; the music becoming audible turns it on.
  function sitePref() { try { return localStorage.getItem('mtw-sound'); } catch (e) { return null; } }
  function siteSound(on) { var t = window.MTWTactile; if (t && t.isSoundOn() !== on) t.setSound(on); }
  function siteBlocked(b) { var t = window.MTWTactile; if (t && t.setBlocked) t.setBlocked(b); }
  var music = story.music, audio = null, muted = q.has('mute') || sitePref() === 'off', audioLive = false, waiting = false;
  // Resolve before storing a cross-page tail: the next file may have a different directory depth.
  music.src = new URL(music.src, document.baseURI).href;
  var state = 'play', t0 = 0, T = 0, raf = 0, lastMT = null;
  var SLOW = Math.max(1, +q.get('slow') || 1);
  var seek = q.has('t') ? clamp(parseFloat(q.get('t')) || 0, 0, LOOP) : 0, hold = q.has('hold');
  function now() { return performance.now() / 1000; }
  // holdEnd (Matt, 2026-09-26: "hold on the to be continued pow and users can scroll into the content"): play once, then
  // stay on the final freeze frame until the reader enters the page. Without it the story loops with the song.
  var HOLD_END = !!story.holdEnd, END = LOOP - 0.02, held = false, heldAt = 0;
  // holdLive (Matt, 2026-09-27: "then the nice animation with the floating cubes going upward"): on the held close the
  // campfire's embers keep rising off the grid instead of freezing.
  var liveRun = false; // one loop at a time (a quick pause and play must not start a second)
  function liveHold() { if (state !== 'play' || !held) { liveRun = false; return; } liveRun = true; drawBack(END + (now() - heldAt)); requestAnimationFrame(liveHold); }
  function clockTime() {
    if (held) return END;
    if (audioLive && audio && !audio.paused) {
      var mt = audio.currentTime - music.offset;
      // Held stories never run backwards: a music clock that jumps back more than a second (the song ended and wrapped)
      // holds the story at END. Seeks and resyncs reset lastMT.
      if (HOLD_END) { if (mt >= END || (lastMT != null && mt < lastMT - 1)) { held = true; return END; } lastMT = mt; return Math.max(0, mt); }
      // The story is one pass of the song: at its end the music restarts on the first downbeat with the story.
      if (mt >= LOOP || mt < 0) { audio.currentTime = music.offset; mt = 0; }
      return mt % LOOP;
    }
    if (HOLD_END) { var pt = now() - t0; if (pt >= END) { held = true; return END; } return Math.max(0, pt); }
    return ((now() - t0) % LOOP + LOOP) % LOOP;
  }
  function frame() {
    raf = 0;
    if (state !== 'play') return;
    if (!hold) T = clockTime();
    render(T);
    if (held) { showScores(); if (story.holdLive && !heldAt) { heldAt = now(); requestAnimationFrame(liveHold); } }
    // Held on the final frame: nothing moves, so stop drawing until the reader enters the page.
    if (!document.hidden && !held) raf = requestAnimationFrame(frame);
  }
  // Music is on by default (Matt, 2026-09-26). Browsers refuse audible autoplay until the first interaction, so a refused
  // start waits for the first click, tap or key and then joins the story where it is.
  function startMusic() {
    if (audioLive || hold || userPaused) return;
    if (!audio) {
      audio = new Audio(music.src); audio.preload = 'auto';
      // The music plays the whole time (Matt, 2026-09-26): the track loops through the story's hold and after the reader
      // has entered the page; only the mute button silences it.
      // A held story whose song file ends a moment before its END holds there (the rewind below must not send the story
      // back to its start; found 2026-09-28 on two stories cut 0.3-1.2 s past their song).
      audio.addEventListener('ended', function () { if (HOLD_END && !held && (state === 'play' || state === 'paused')) held = true; audio.currentTime = 0; audio.play().catch(function () {}); });
    }
    audio.muted = muted; audio.volume = mixIn ? 0 : 0.85;
    var from = clockTime();
    try { audio.currentTime = music.offset + from; } catch (e) {}
    var pr = audio.play();
    // Playback can begin well after the request (loading, or the first gesture): join the story where it is then.
    function ok() {
      var story_t = ((now() - t0) % LOOP + LOOP) % LOOP;
      if (state === 'play' && !held && Math.abs(audio.currentTime - music.offset - story_t) > 0.08) { try { audio.currentTime = music.offset + story_t; } catch (e) {} lastMT = null; }
      audioLive = true; waiting = false; tag.classList.remove('is-waiting'); mixSet({ unlocked: true, track: music.credit });
      siteBlocked(false); if (!muted) siteSound(true);
      // Arriving from another track: this one fades in under the last one's tail.
      if (mixIn) { mixIn = false; ramp(audio, 0, 0.85, XF, EQ_IN); playTail(); }
      // The tag shows the credit for ten seconds of actual music, then folds to the mute button.
      clearTimeout(foldTimer); foldTimer = setTimeout(function () { tag.classList.remove('is-open'); }, 10000);
    }
    // A browser refuses audible autoplay until the visitor's first click, tap or key on the site: say so plainly.
    if (pr && pr.then) pr.then(ok, function () {
      // A tap's refused pointerdown can settle after its pointerup has already started the music: ignore it then.
      if (audioLive) return;
      waiting = true; tag.classList.add('is-waiting', 'is-open'); siteBlocked(true);
    }); else ok();
  }
  // Following a way in (a link over a panel), Let's Talk, Previous, Next or a Tracklist row leaves the page: it does not
  // start this track on the way out. The pause
  // button handles its own gesture (Play may start held-back music; Pause never does).
  // Let's Talk and the Tracklist's rows leave the page too.
  function onFirstGesture(e) { if (e && e.target && e.target.closest && e.target.closest('[data-motion-progress], .rl-links, .rl-pause, .rl-talk, .rl-prev, .rl-next, a.rl-tl__a')) return; if (!audioLive) startMusic(); }
  // Only these count as the gesture that allows sound (touchstart and a touch pointerdown do not).
  ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'].forEach(function (ev) { window.addEventListener(ev, onFirstGesture, { capture: true, passive: true }); });
  function setMuted(m) {
    muted = m; siteSound(!m);
    if (audio) audio.muted = m;
    tag.classList.toggle('is-muted', m);
    muteBtn.setAttribute('aria-pressed', m ? 'true' : 'false');
    muteBtn.setAttribute('aria-label', m ? 'Unmute music' : 'Mute music');
    if (!m) startMusic();
  }
  // What the sound box says: SOUND ON while the music is audible, otherwise (held back by the browser, or muted) the
  // prompt to click or tap the screen, which is then true: the click starts or unmutes the music.
  function soundSay() { return audioLive && !muted && audio && !audio.paused ? 'on' : 'prompt'; }
  // Muted, a click or tap on the comic while the sound box shows turns sound on, as it says (the site setting and nav
  // Sound Toggle follow through setMuted). Anywhere else, and outside the box's window, the visitor's mute stands. The
  // controls keep their own behaviour, and a touch that moved beyond the tap slop is a swipe, not a tap.
  function soundBoxUp() {
    if (state !== 'play') return false;
    for (var i = 0; i < panels.length; i++) { var p = panels[i]; if (p.d.sound && T >= p.t && T < (p.page.b + (p.d.until != null ? p.d.until : p.page.l)) * B) return true; }
    return false;
  }
  function onSoundBoxTap(e) {
    if (!muted || !soundBoxUp() || !stage.contains(e.target) || (e.target.closest && e.target.closest('.rl-dock, a, button'))) return;
    if (e.type === 'touchend' && touchMoved) return;
    setMuted(false);
  }
  window.addEventListener('click', onSoundBoxTap);
  window.addEventListener('touchend', onSoundBoxTap);
  // The nav's Sound Toggle (or another tab) changed the site's sound: follow it. Its click is a gesture, so it may start
  // music the browser was holding back.
  window.addEventListener('mtw-sound', function (e) { var on = !!(e.detail && e.detail.on); if (on) { if (muted) setMuted(false); else startMusic(); } else if (!muted) setMuted(true); });
  // While the browser is holding the music back, the speaker starts it rather than muting it.
  muteBtn.addEventListener('click', function () { if (waiting) { if (muted) setMuted(false); startMusic(); } else setMuted(!muted); });
  // Pause and play (Matt, 2026-09-28: "for all pages add a pause/play button to the left of the "Skip Intro" button",
  // reversing 2026-09-26's "no pause button"): the story clock and the music stop together and resume together from
  // the same moment. It is not a way into the page: the comic stays until a scroll, swipe, key or Skip Intro. Its click
  // is a gesture, so Play starts music the browser was holding back; Pause never starts it.
  var userPaused = false, pausedAt = 0;
  function setPaused(pz, preserveBlockedSound) {
    if (pz === userPaused || (state !== 'play' && state !== 'paused')) return;
    userPaused = pz;
    if (pz) {
      if (state === 'play' && !hold) T = clockTime();
      state = 'paused'; pausedAt = now();
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (audio) audio.pause();
    } else {
      state = 'play';
      if (heldAt) heldAt += now() - pausedAt; // the held embers carry on from where they stopped
      t0 = now() - T;
      if (audioLive && audio) { if (!held) { try { audio.currentTime = music.offset + T; } catch (e) {} lastMT = null; } audio.play().catch(function () {}); }
      else if (!preserveBlockedSound) startMusic();
      if (!raf) raf = requestAnimationFrame(frame);
      if (held && story.holdLive && !liveRun) requestAnimationFrame(liveHold);
    }
    tag.classList.toggle('is-paused', pz);
    if (TB) TB.setPaused(pz);
  }

  /* ---------- The motion toolbar (MotionToolbar.astro, public/scripts/motion-toolbar.js) ----------
     Matt, 2026-09-28: "this toolbar shall be canonical in all motion graphic experiences". The toolbar owns its buttons,
     the Tracklist dialog and the pinned set; the comic registers what Pause/Play and Skip Intro do, its beat and its
     song time (the Tracklist's playing row), and ignores input that would fold it while the Tracklist is open. */
  if (TB) TB.register({ beat: B, songTime: function () { return audioLive && audio ? audio.currentTime - music.offset : T; }, togglePause: function () { setPaused(!userPaused); }, skip: collapse });
  function seekTo(t) {
    T = clamp(t, 0, END); held = HOLD_END && T >= END; heldAt = held ? (userPaused ? pausedAt : now()) : 0;
    t0 = now() - T; lastMT = null;
    if (audioLive && audio) { try { audio.currentTime = music.offset + T; } catch (e) {} }
    render(T);
    if (state === 'play' && !held && !raf) raf = requestAnimationFrame(frame);
    if (held && story.holdLive && !liveRun && state === 'play') requestAnimationFrame(liveHold);
  }
  var resumeAfterScrub = false;
  if (window.MTWProgress) progress = window.MTWProgress.mount(stage.querySelector('[data-motion-progress]'), {
    duration: END, seek: seekTo,
    start: function () { resumeAfterScrub = state === 'play' && !userPaused; if (resumeAfterScrub) setPaused(true); },
    end: function () { if (resumeAfterScrub) setPaused(false, true); resumeAfterScrub = false; }
  });
  // The tag opens with the credit for ten seconds, then folds to the mute button (it reopens on hover or focus).
  var foldTimer = setTimeout(function () { if (!waiting) tag.classList.remove('is-open'); }, 10000);

  /* ---------- Keep the scroll reveal holding while the reel plays ---------- */
  new MutationObserver(function () {
    if ((state === 'play' || state === 'paused') && !root.hasAttribute('data-mtw-reveal')) root.setAttribute('data-mtw-reveal', '');
  }).observe(root, { attributes: true, attributeFilter: ['data-mtw-reveal'] });

  /* ---------- Collapse into the static hero ---------- */
  var lastWheel = 0, collapseEnd = 0;
  function restingRect(target) {
    var r = target.getBoundingClientRect(), cs = getComputedStyle(target), tf = cs.transform, tr = cs.translate;
    var dx = 0, dy = 0, sc = 1;
    if (tf && tf !== 'none' && window.DOMMatrixReadOnly) { var m = new DOMMatrixReadOnly(tf); sc = m.a || 1; dx = m.m41; dy = m.m42; }
    if (tr && tr !== 'none') { var pr = tr.split(' '); dx += parseFloat(pr[0]) || 0; dy += parseFloat(pr[1]) || 0; }
    var w = r.width / sc, h = r.height / sc, cx = r.left + r.width / 2 - dx, cy = r.top + r.height / 2 - dy;
    return { left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2 };
  }
  /* ---------- High Scores: the board on the held "TO BE CONTINUED." ---------- */
  // (Matt, 2026-09-26.) Each row links to a service page; the page transition carries the reader there and the mixtape
  // fades this track out. While the ending holds, one score goes up by a funny amount on every beat, the board re-sorts,
  // and on the homepage (cycle) it pages through every service, as an arcade's attract mode does.
  var scoresEl = stage.querySelector('.rl-scores'), scoreTimer = 0, scoresOn = false;
  var FUNNY = [1, 7, 42, 99, 404, 1337, 9001, 31337];
  function ordinal(n) { var t = n % 100, u = n % 10; return n + (t > 10 && t < 14 ? 'TH' : u === 1 ? 'ST' : u === 2 ? 'ND' : u === 3 ? 'RD' : 'TH'); }
  function pad7(n) { var t = String(n); while (t.length < 7) t = '0' + t; return t; }
  function showScores() {
    if (!scoresEl || scoresOn || state !== 'play') return;
    scoresOn = true;
    var rows = Array.prototype.map.call(scoresEl.querySelectorAll('li'), function (li) {
      var a = li.querySelector('a');
      return { li: li, a: a, score: +a.getAttribute('data-score') || 0, shown: +a.getAttribute('data-score') || 0, num: a.querySelector('.rl-scores__num'), rank: a.querySelector('.rl-scores__rank'), who: a.querySelector('b'), svc: a.querySelector('small') };
    });
    var hs = story.highScores || {}, centre = !!hs.center, st0 = stage.getBoundingClientRect();
    var spot = centre ? null : closeEl.querySelector('.rl-close__art, .rl-close__panel');
    // Centred (the homepage): the board sits under the held "TO BE CONTINUED." and the close's words clear away, so the
    // held frame reads as an arcade's game-over screen. Otherwise it takes the place of the close's art or panel.
    var slab = null; sfxs.forEach(function (S) { if (S.still && S.page.close) slab = S.el.getBoundingClientRect(); });
    var topMin = centre && slab && slab.height ? slab.bottom - st0.top + 12 : H * 0.4;
    var spotTop = spot ? spot.getBoundingClientRect().top - st0.top : topMin;
    // A phone shows as many rows as fit above the dock (two or three), and pages through the rest.
    var list = scoresEl.querySelector('ol'), cycle = !!hs.cycle, n = W < 850 ? clamp(Math.floor((H - 76 - spotTop - 84) / 46), 2, centre ? 5 : 3) : 5, pageN = 0, beat = 0;
    function lay() {
      rows.sort(function (a, b) { return b.score - a.score; });
      var pages = Math.max(1, Math.ceil(rows.length / n)); pageN %= pages;
      rows.forEach(function (r, i) { list.appendChild(r.li); r.rank.textContent = ordinal(i + 1); r.li.hidden = !(i >= pageN * n && i < pageN * n + n); });
    }
    function roll(r) {
      var from = r.shown, to = r.score, a0 = now();
      (function step() { var k = c01((now() - a0) / 0.45); r.shown = Math.round(from + (to - from) * k); r.num.textContent = pad7(r.shown); if (k < 1) requestAnimationFrame(step); })();
    }
    lay();
    scoresEl.hidden = false;
    var bh = scoresEl.offsetHeight, sp = spot ? spot.getBoundingClientRect() : null;
    if (centre) {
      var cw = Math.min(560, W - 32);
      scoresEl.style.cssText = 'left:' + ((W - cw) / 2).toFixed(0) + 'px;right:auto;width:' + cw.toFixed(0) + 'px';
      bh = scoresEl.offsetHeight; // centred in the space between the slab and the dock
      scoresEl.style.top = clamp(topMin + Math.max(0, (H - 76 - topMin - bh) / 2), 0, H - bh - 76).toFixed(0) + 'px';
      closeParts.forEach(function (e) { e.style.transition = 'opacity .5s'; e.style.opacity = '0'; });
    } else if (sp && W >= 850) {
      var bw = Math.max(sp.width, 440), top = clamp(sp.top + sp.height / 2 - bh / 2 - st0.top, H * 0.4, H - bh - 76);
      scoresEl.style.cssText = 'left:' + (sp.right - bw - st0.left).toFixed(0) + 'px;top:' + top.toFixed(0) + 'px;width:' + bw.toFixed(0) + 'px';
    } else if (sp) scoresEl.style.cssText = 'top:' + clamp(sp.top - st0.top, 0, H - bh - 76).toFixed(0) + 'px';
    if (spot) { spot.style.transition = 'opacity .5s'; spot.style.opacity = '0'; }
    // 8-bit (Matt, 2026-09-26): the links stay real (keyboard, clicks, screen readers) with invisible text; the board
    // is painted behind them as a pixel sprite snapped to the flat palette, like the SFX slabs.
    var cv = el('canvas', 'rl-scores__px'), sp8 = {}, hover = null, flashR = null, flashUntil = 0, PX = 2, last = 0;
    scoresEl.insertBefore(cv, scoresEl.firstChild);
    rows.forEach(function (r) {
      r.a.addEventListener('pointerenter', function () { hover = r; });
      r.a.addEventListener('pointerleave', function () { if (hover === r) hover = null; });
      r.a.addEventListener('focus', function () { hover = r; });
      r.a.addEventListener('blur', function () { if (hover === r) hover = null; });
    });
    var titleEl = scoresEl.querySelector('.rl-scores__h'), footEl = scoresEl.querySelector('.rl-scores__foot');
    function box(e, b) { var r = e.getBoundingClientRect(); return [r.left - b.left, r.top - b.top, r.width, r.height, parseFloat(getComputedStyle(e).fontSize) || 16]; }
    // Painted text keeps to its box: shrunk to fit the room left in its row (maxW), never spilling off the board.
    function text(c, t, bx, col, maxW) { var z = bx[4]; c.font = font(z); var w = c.measureText(t).width; if (maxW && w > maxW) { z *= maxW / w; c.font = font(z); } c.textBaseline = 'alphabetic'; var y = bx[1] + bx[3] / 2 + z * 0.34; c.fillStyle = '#0b1419'; c.fillText(t, bx[0] + 2, y + 2); c.fillStyle = col; c.fillText(t, bx[0], y); }
    function paint() {
      if (!scoresOn) return;
      requestAnimationFrame(paint);
      var tn = now(); if (tn - last < 0.05) return; last = tn;
      var b = scoresEl.getBoundingClientRect(), bw2 = scoresEl.offsetWidth, bh2 = scoresEl.offsetHeight, SH = 6;
      var vis = rows.filter(function (r) { return !r.li.hidden; });
      var fl = tn < flashUntil && Math.floor((flashUntil - tn) / 0.2) % 2 === 0 ? flashR : null, foot = Math.floor(tn / 0.6) % 2 === 0;
      var geo = vis.map(function (r) { return { r: r, row: box(r.a, b), rank: box(r.rank, b), num: box(r.num, b), who: box(r.who, b), svc: box(r.svc, b) }; });
      var key = geo.map(function (g) { return g.r.rank.textContent + g.r.num.textContent + g.row[1].toFixed(0); }).join('|') + '/' + (hover ? hover.rank.textContent : '') + '/' + (fl ? fl.rank.textContent : '') + foot + bw2 + 'x' + bh2;
      sprite(sp8, cv, bw2 + SH, bh2 + SH, PX, key, function (c) {
        c.fillStyle = '#1a9ba1'; c.fillRect(SH, SH, bw2, bh2);
        c.fillStyle = '#0b1419'; c.fillRect(0, 0, bw2, bh2);
        c.strokeStyle = '#5fc4c9'; c.lineWidth = 4; c.strokeRect(2, 2, bw2 - 4, bh2 - 4);
        var tb = box(titleEl, b); c.font = font(tb[4]); var tw = c.measureText('HIGH SCORES').width;
        poster(c, 'HIGH SCORES', (bw2 - tw) / 2, tb[1] + tb[3] / 2 + tb[4] * 0.34, tb[4], '#5fc4c9');
        geo.forEach(function (g) {
          // Lit rows (hover, the bumped score) read in one colour against their bar.
          var on = g.r === hover, lit = on || g.r === fl, ink = on ? '#0b1419' : lit ? '#f2f2ef' : null;
          if (lit) { c.fillStyle = on ? '#5fc4c9' : '#1a9ba1'; c.fillRect(g.row[0], g.row[1], g.row[2], g.row[3]); }
          text(c, g.r.rank.textContent, g.rank, ink || '#f2f2ef');
          text(c, g.r.num.textContent, g.num, ink || '#5fc4c9');
          text(c, g.r.who.textContent.toUpperCase(), g.who, ink || '#f2f2ef', g.row[0] + g.row[2] - g.who[0] - 6);
          text(c, g.r.svc.textContent.toUpperCase(), g.svc, ink || '#5fc4c9', g.row[0] + g.row[2] - g.svc[0] - 6);
        });
        if (foot && footEl) { var fb = box(footEl, b), ft = footEl.textContent.toUpperCase(); c.font = font(fb[4]); var fw = c.measureText(ft).width; text(c, ft, [(bw2 - fw) / 2, fb[1], fw, fb[3], fb[4]], '#f2f2ef'); }
      });
    }
    requestAnimationFrame(function () { scoresEl.classList.add('is-on'); paint(); });
    scoreTimer = setInterval(function () {
      if (document.hidden) return;
      beat++;
      var vis = rows.filter(function (r) { return !r.li.hidden; }), pool = Math.random() < 0.75 && vis.length ? vis : rows, pick = pool[Math.floor(Math.random() * pool.length)];
      pick.score = (pick.score * (Math.random() < 0.08 ? 2 : 1) + FUNNY[Math.floor(Math.random() * FUNNY.length)]) % 10000000;
      if ((cycle || rows.length > n) && beat % 6 === 0) pageN++; // a phone pages through related services that do not fit
      lay(); roll(pick);
      flashR = pick; flashUntil = now() + 0.6;
    }, B * 1000);
  }
  function hideScores() { if (scoreTimer) { clearInterval(scoreTimer); scoreTimer = 0; } scoresOn = false; if (scoresEl) scoresEl.classList.remove('is-on'); }

  function collapse() {
    if (state !== 'play' && state !== 'paused') return;
    hideScores();
    if (state === 'play' && !hold) T = clockTime();
    // Paused and entering the page: the music carries on into it, as it always does (the pause was the comic's).
    if (userPaused) { userPaused = false; tag.classList.remove('is-paused'); if (audioLive && audio) audio.play().catch(function () {}); }
    state = 'collapsing';
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    // The music keeps playing into the page; the sound tag moves out of the stage and stays pinned bottom right.
    // Let's Talk, Tracklist, Previous and Next stay with it, pinned by the toolbar (Matt, 2026-09-28: the permanent way
    // to stay in the 8-bit experience).
    tag.classList.add('rl-tag--page');
    if (TB) TB.pin(tag); else document.body.appendChild(tag);
    if (window.scrollY) window.scrollTo(0, 0);
    var target = document.querySelector(story.collapseTo || '.home-intro');
    var r = target ? restingRect(target) : { left: W * 0.55, top: H * 0.3, right: W * 0.9, bottom: H * 0.7 };
    var inset = [r.top, W - r.right, H - r.bottom, r.left];
    stage.classList.add('is-collapsing');
    var frameEl = el('div', '', stage);
    frameEl.style.cssText = 'position:absolute;inset:0;z-index:4;border:1px solid #b4d5d52c;border-radius:4px;pointer-events:none;opacity:0';
    // Fold: the comic breaks up while the stage clips down to the panel's box. Hold: the framed grid keeps its fire until
    // the real panel starts its reveal (after the heading types). Hand-off: the stage fades over it.
    var start = now(), FOLD = 0.95, released = false, frozen = T, handAt = 0, MAX_HOLD = 4;
    // The hand-off waits for the target's own reveal only when there is one: the page runs the scroll reveal
    // (ScrollReveal.astro arms html[data-reveal-armed]) and the target takes part in it. A page without it (a Journal
    // entry) would otherwise hold the framed grid for the whole 4 s cap before the stage let go.
    var waits = !!target && root.hasAttribute('data-reveal-armed') && !!target.matches && target.matches('[data-reveal], [data-reveal-type]');
    collapseEnd = performance.now() + (FOLD * SLOW + 1.5) * 1000;
    (function step() {
      var e = (now() - start) / SLOW, k = inOut(e / FOLD), fade = c01(e / 0.28);
      root.dataset.reelExpand = (1 - k).toFixed(3);
      scenesEl.style.opacity = (1 - fade).toFixed(3);
      scenesEl.style.transform = 'scale(' + (1 - 0.04 * out3(e / 0.4)).toFixed(4) + ')';
      var box = inset.map(function (v) { return (v * k).toFixed(1) + 'px'; }).join(' ');
      var clip = 'inset(' + box + ' round ' + (4 * k).toFixed(1) + 'px)';
      stage.style.clipPath = clip; stage.style.webkitClipPath = clip;
      frameEl.style.inset = box; frameEl.style.opacity = c01(e / 0.3).toFixed(3);
      G.teal = false; G.trails.length = 0; G.ember = 1 - 0.6 * c01(e / FOLD);
      stage.setAttribute('data-ground', 'ink');
      drawBack(frozen + e);
      // The cut canvas carries the break-up: the comic pixelates into tiles that clear upwards.
      drawBreakup(e);
      stage.querySelector('.rl-ground').style.opacity = (1 - 0.35 * c01((e - 0.5) / 0.45)).toFixed(3);
      if (!released && e > 0.42) { released = true; root.removeAttribute('data-mtw-reveal'); }
      if (!handAt && e >= FOLD && (!waits || target.classList.contains('is-revealed') || e > FOLD + MAX_HOLD)) handAt = e;
      var h = handAt ? c01((e - handAt) / 0.55) : 0;
      stage.style.opacity = (1 - out3(h)).toFixed(3);
      if (h < 1) requestAnimationFrame(step); else finish();
    })();
  }
  function drawBreakup(e) {
    var ctx = fctx; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    if (e > 0.6) return;
    var cols = Math.ceil(W / pitch) + 1, rows = Math.ceil(H / pitch) + 1;
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var th = (1 - y / rows) * 0.6 + hash(x, y, 11) * 0.4, on = c01((e / 0.22) - hash(x, y, 12) * 0.6), off = c01((e - 0.12) / 0.45 * 1.4 - th);
      var a = Math.min(on, 1 - off) * 0.9; if (a <= 0.02) continue;
      var h = hash(x, y, 13); put(h < 0.2 ? RGB.tealLight : h < 0.55 ? RGB.teal : RGB.ink, a, x * pitch, y * pitch);
    }
    flush(ctx, pitch * 0.76);
  }
  function finish() {
    state = 'done';
    root.setAttribute('data-reel', 'done');
    delete root.dataset.reelExpand;
    root.removeAttribute('data-mtw-reveal');
    window.scrollTo(0, 0);
  }

  /* ---------- Input: the first scroll gesture enters the site ---------- */
  var KEYS = { ArrowDown: 1, PageDown: 1, ' ': 1, Spacebar: 1, End: 1, ArrowUp: 1, PageUp: 1, Home: 1 };
  function onWheel(e) {
    if (tbOpen()) return; // the Tracklist is open over the comic: it is not a way into the page
    var t = performance.now(), quiet = t - lastWheel > 220; lastWheel = t;
    if (state === 'play' || state === 'paused') { e.preventDefault(); collapse(); return; }
    // Swallow the rest of the gesture (trackpad inertia) so the reader lands on the hero, not below it.
    if (state === 'collapsing' || (state === 'done' && (t < collapseEnd || !quiet))) { e.preventDefault(); return; }
    window.removeEventListener('wheel', onWheel, { passive: false });
  }
  // A finger tap wobbles a few pixels and fires touchmove: only a real swipe enters the page, so the tap that asks for
  // sound starts the music instead of folding the comic away (Matt, 2026-09-28: tap to unmute "does not work" on a phone).
  var SWIPE = 12, touch0 = null, touchMoved = false;
  window.addEventListener('touchstart', function (e) { var p = e.touches[0]; touch0 = p ? [p.clientX, p.clientY] : null; touchMoved = false; }, { passive: true });
  function onTouch(e) {
    if (tbOpen()) return;
    if (state === 'play' || state === 'paused') {
      e.preventDefault();
      var p = e.touches[0];
      if (!touch0 || !p || Math.abs(p.clientX - touch0[0]) > SWIPE || Math.abs(p.clientY - touch0[1]) > SWIPE) { touchMoved = true; collapse(); }
    } else if (state === 'collapsing') e.preventDefault();
  }
  function onKey(e) {
    if (tbOpen()) return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var tagName = (e.target && e.target.tagName) || '';
    if (KEYS[e.key] && !/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(tagName) && (state === 'play' || state === 'paused')) { e.preventDefault(); collapse(); }
  }
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchmove', onTouch, { passive: false });
  window.addEventListener('keydown', onKey);
  // Anything that moves the page while the reel owns it (scrollbar, a script, find-in-page) enters the site at the top.
  window.addEventListener('scroll', function () {
    if (tbOpen()) return;
    if (state === 'play' || state === 'paused') { window.scrollTo(0, 0); collapse(); }
    else if (state === 'collapsing' && window.scrollY) window.scrollTo(0, 0);
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (userPaused) return; // paused by the visitor: stays paused until Play
    // Music rests while the tab is hidden and resumes on return, in the story, on its hold and in the page.
    if (audioLive && audio && (state !== 'play' || held)) { if (document.hidden) audio.pause(); else audio.play().catch(function () {}); return; }
    if (state !== 'play') return;
    if (document.hidden) { T = clockTime(); if (audio) audio.pause(); }
    else { if (held) return; t0 = now() - T; if (audioLive && audio) { audio.currentTime = music.offset + T; lastMT = null; audio.play().catch(function () {}); } if (!raf) raf = requestAnimationFrame(frame); }
  });
  window.addEventListener('resize', function () { if (state === 'play' || state === 'paused') { measure(); render(T); } });

  /* ---------- Start ---------- */
  window.MTWBeatComic = {
    collapse: collapse,
    status: function () { return { state: state, T: +T.toFixed(3), duration: END, held: held, userPaused: userPaused, audioLive: audioLive, paused: audio ? audio.paused : null, music: audio ? +(audio.currentTime - music.offset).toFixed(3) : null, muted: muted }; },
    seek: seekTo,
  };
  // Mixed like a DJ (Matt, 2026-09-27: "similar to a dj mixing and fading two jams"): leaving, the track only dips under
  // the page transition's cover and hands its place to the next page (mtw-mixtape.tail), which carries it on from where
  // it was and fades it out while its own track fades in: an equal-power crossfade across the page change.
  var XF = 4;
  function ramp(a, from, to, secs, shape, done) {
    var r0 = now();
    (function step() { var k = c01((now() - r0) / secs); a.volume = clamp(from + (to - from) * shape(k), 0, 1); if (k < 1) requestAnimationFrame(step); else if (done) done(); })();
  }
  var EQ_IN = function (k) { return Math.sin(k * Math.PI / 2); }, EQ_OUT = function (k) { return 1 - Math.cos(k * Math.PI / 2); };
  new MutationObserver(function () {
    if (!root.hasAttribute('data-mtw-leaving') || !audio || audio.paused) return;
    if (!muted) mixSet({ tail: { src: music.src, t: audio.currentTime, at: Date.now(), vol: audio.volume * 0.6 } });
    ramp(audio, audio.volume, audio.volume * 0.6, 0.6, EQ_IN);
  }).observe(root, { attributes: true, attributeFilter: ['data-mtw-leaving'] });
  var mixIn = false;
  function playTail() {
    var tail = mixGet().tail; mixSet({ tail: null });
    if (!tail || muted || tail.src === music.src || Date.now() - tail.at > 8000) return;
    var a = new Audio(tail.src); a.volume = tail.vol;
    try { a.currentTime = tail.t + (Date.now() - tail.at) / 1000; } catch (e) {}
    var pr = a.play();
    var go = function () { ramp(a, tail.vol, 0, XF, EQ_OUT, function () { a.pause(); }); };
    if (pr && pr.then) pr.then(go, function () {}); else go();
  }

  // Arrival: when this page was reached through the page transition, the story holds its first frame under the cover
  // and starts, with its music, the moment the tiles begin to clear: the track drops as the page is revealed.
  function arriving() { var l = document.querySelector('.page-transition'); return root.hasAttribute('data-mtw-nav') && !(l && l.dataset.phase === 'reveal'); }
  function begin() {
    if (state !== 'play') return;
    mixIn = !!mixGet().tail;
    T = seek; t0 = now() - T;
    raf = requestAnimationFrame(frame);
    startMusic();
  }
  function start() {
    measure();
    T = seek; t0 = now() - T;
    tag.classList.toggle('is-muted', muted);
    if (hold) { state = 'paused'; render(T); return; }
    if (!arriving()) { begin(); return; }
    render(T);
    var done = false, go = function () { if (done || arriving()) return; done = true; obs.disconnect(); begin(); };
    var obs = new MutationObserver(go);
    obs.observe(root, { attributes: true, attributeFilter: ['data-mtw-nav'], subtree: false });
    var layerEl = document.querySelector('.page-transition'); if (layerEl) obs.observe(layerEl, { attributes: true, attributeFilter: ['data-phase'] });
    setTimeout(function () { if (!done) { done = true; obs.disconnect(); begin(); } }, 3500); // never trapped behind a stuck cover
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (state === 'play' || state === 'paused') { measure(); panels.forEach(function (p) { p.drawn = ''; }); render(T); } });
  start();
})();
