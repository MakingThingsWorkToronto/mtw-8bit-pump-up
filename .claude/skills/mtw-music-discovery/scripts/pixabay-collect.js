// Pixabay Music collector (skill: mtw-music-discovery). Runs INSIDE a real browser tab on https://pixabay.com/ (Claude in
// Chrome: run this file's text with javascript_tool once per tab). Pixabay refuses scripted requests from outside a
// browser (403, and a bot challenge for headless Chrome); never try to get round that.
//   await mtwSearch('whistle ukulele', { order: 'trending', pages: 2 })  -> [{ id, slug }] in Pixabay's order
//     order: '' (Pixabay's default, popular), 'trending', 'ec' (editor's choice) or 'latest'
//   await mtwCollect(['277626', ...])  -> one record per track, read from the track page's JSON-LD
//   mtwBrief(records)  -> one short line per record, to glance at through the tool (it returns ~1,000 characters)
//   mtwShow(records)   -> replaces the page with the records as JSON between MTWJSON and MTWEND; read it with
//                         get_page_text and save it as the run's records file
//   await mtwSave(name, records, from)  -> posts to MTW Studio's /api/collected (port 8792), where Chrome allows a page to reach localhost
// Pacing: one request at a time with a pause between. A tab that is not in front has its timers throttled to about
// once a minute, so pauses run on a Worker timer. Pixabay answers 429 to rapid reads: mtwCollect waits and retries.
// A javascript_tool call times out after about 45 s: start long work without awaiting it (results land on window) and
// poll.
(() => {
  const PAUSE_MS = 1500, BACKOFF_MS = 15000;
  const worker = new Worker(URL.createObjectURL(new Blob(['onmessage=e=>setTimeout(()=>postMessage(e.data),e.data)'], { type: 'text/javascript' })));
  const sleep = (ms) => new Promise((r) => { const h = () => { worker.removeEventListener('message', h); r(); }; worker.addEventListener('message', h); worker.postMessage(ms); });
  const seconds = (iso) => { const m = /PT(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || ''); return m ? (+m[1] || 0) * 60 + (+m[2] || 0) : null; };
  window.mtwSearch = async (query, { order = '', pages = 1 } = {}) => {
    const out = [], seen = new Set();
    for (let p = 1; p <= pages; p++) {
      const qs = new URLSearchParams(); if (order) qs.set('order', order); if (p > 1) qs.set('pagi', String(p));
      const url = `/music/search/${query ? encodeURIComponent(query) + '/' : ''}${qs.toString() ? '?' + qs : ''}`;
      const html = await (await fetch(url)).text();
      for (const m of html.matchAll(/\/music\/([a-z0-9-]+)-(\d+)\//g)) if (!seen.has(m[2])) { seen.add(m[2]); out.push({ id: m[2], slug: m[1] }); }
      await sleep(PAUSE_MS);
    }
    return out;
  };
  const readOne = async (id) => {
    // /music/x-<id>/ redirects to the canonical track page.
    const res = await fetch(`/music/x-${id}/`);
    if (res.status === 429) return { id, error: 'rate limited (429)' };
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const ld = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent))
      .find((o) => [].concat(o['@type']).includes('MusicRecording'));
    if (!ld) return { id, error: `no track data (${res.status})` };
    const prop = (n) => (ld.additionalProperty || []).find((p) => p.name === n)?.value;
    const stat = (t) => (ld.interactionStatistic || []).find((s) => s.interactionType.endsWith(t))?.userInteractionCount ?? null;
    const artist = ld.author?.name || '';
    // og:title reads "<Title> by <Artist> | Royalty-free Music": keep the title exactly as published.
    const og = doc.querySelector('meta[property="og:title"]')?.content || ld.name || '';
    const title = og.replace(/ \| Royalty-free Music.*$/, '').replace(new RegExp(` by ${artist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '');
    const keywords = ld.keywords || '';
    return { id, title, artist, source: res.url.replace(/\?.*$/, ''), genre: [].concat(ld.genre || []), moods: prop('Mood') || '',
      cid: prop('Content ID Registered') === true, seconds: seconds(ld.duration), published: (ld.datePublished || '').slice(0, 10),
      audio: ld.contentUrl, views: stat('ViewAction'), downloads: stat('DownloadAction'), likes: stat('LikeAction'),
      vocalTag: /\b(vocals?|voice|singing|singer|choir|lyrics|acapella)\b/i.test(keywords) };
  };
  window.mtwCollect = async (ids) => {
    const out = [];
    for (const id of ids) {
      let r;
      for (let attempt = 0; attempt < 3; attempt++) {
        try { r = await readOne(id); } catch (e) { r = { id, error: String(e) }; }
        if (!/429/.test(r.error || '')) break;
        await sleep(BACKOFF_MS);
      }
      out.push(r);
      await sleep(PAUSE_MS);
    }
    return out;
  };
  window.mtwBrief = (records) => records.map((r) => `${r.id} ${r.error || `${r.title} | ${r.artist} | ${r.seconds}s`}`).join('\n');
  window.mtwShow = (records) => {
    document.body.innerHTML = '';
    const a = document.createElement('article'); a.textContent = 'MTWJSON' + JSON.stringify(records) + 'MTWEND';
    document.body.appendChild(a);
    return records.length;
  };
  window.mtwSave = async (name, records, from, port = 8792) => { // MTW Studio answers /api/collected
    const res = await fetch(`http://localhost:${port}/api/collected`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, from, records }) });
    if (!res.ok) throw new Error(`save failed: ${res.status} ${await res.text()}`);
    return (await res.json()).file;
  };
  return 'mtwSearch, mtwCollect, mtwBrief, mtwShow and mtwSave are ready';
})();
