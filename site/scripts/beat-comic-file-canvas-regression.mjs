#!/usr/bin/env node
// Real drawPanel/posterize with a modelled canvas readback policy; no browser-security bypass.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const here = dirname(fileURLToPath(import.meta.url));
const runtime = resolve(process.argv[2] || resolve(here, '../public/scripts/beat-comic.js'));
const reference = resolve(process.argv[3] || resolve(dirname(runtime), '../..'));
const source = readFileSync(runtime, 'utf8');
const a = source.indexOf('  var FLAT ='), b = source.indexOf('  // Pixel shimmer', a);
const c = source.indexOf('  function drawPanel('), d = source.indexOf('  /* ---------- Per-frame DOM', c);
assert(a >= 0 && b > a && c >= 0 && d > c, 'actual posterize/panel boundaries');
function fixture(mode = 'readable') {
  const stats = { reads: 0, draws: 0, puts: 0, glimmers: 0 };
  const state = { mode, px: 6 };
  const context = {
    fillRect() {}, drawImage() { stats.draws++; },
    getImageData(x,y,w,h) {
      stats.reads++;
      if(state.mode !== 'readable') { const error = new Error('modelled canvas readback failure'); error.name = state.mode; throw error; }
      const data = new Uint8ClampedArray(w*h*4); for(let i=0;i<data.length;i+=4){data[i]=30;data[i+1]=80;data[i+2]=120;data[i+3]=255;}
      return { data, width:w, height:h };
    },
    putImageData() { stats.puts++; }
  };
  const styles = {};
  const panel = { cv:{width:0,height:0}, d:{}, w:96, h:60, t:0, ctx:context, src:'local-image', fit:'cover', art:{style:{setProperty(k,v){styles[k]=v}}} };
  const sandbox = vm.createContext({
    images: { 'local-image': { complete:true,naturalWidth:160,naturalHeight:100 } },
    pixelFor(p) {p.settled=true;return state.px}, motion:t=>t, glimStep:(p,t)=>Math.floor(t*12),
    glimmer() {stats.glimmers++}, B:0.6,
  });
  vm.runInContext(source.slice(a,b)+source.slice(c,d),sandbox);
  return { panel, stats, state, styles, draw:t=>sandbox.drawPanel(panel,t), image:sandbox.images['local-image'] };
}
let checks=0;
const file=fixture('SecurityError'); file.draw(0); checks++;
assert.equal(file.panel.readBlocked,true);assert.equal(file.stats.draws,1);assert.equal(file.stats.reads,1);assert.equal(file.stats.puts,0);assert.equal(file.stats.glimmers,0);
assert.equal(file.panel.cv.width,16);assert.equal(file.styles['--px'],'6px');
file.draw(1);assert.equal(file.stats.draws,2);assert.equal(file.stats.reads,1);assert.equal(file.stats.glimmers,0);checks++;
file.state.px=3;file.draw(2);assert.equal(file.panel.cv.width,32);assert.equal(file.stats.reads,1);assert.equal(file.stats.glimmers,0);checks++;
const http=fixture();http.draw(0);assert(http.panel.base);assert.equal(http.panel.readBlocked,undefined);assert.equal(http.stats.reads,1);assert.equal(http.stats.puts,1);assert.equal(http.stats.glimmers,1);
const colours=new Set(Array.from({length:4},(_,i)=>{const p=http.panel.base.data;return[p[i*4],p[i*4+1],p[i*4+2]].join(',')}));
for(const colour of colours)assert(['17,33,38','26,155,161','95,196,201','242,242,239'].includes(colour));
http.draw(1);assert.equal(http.stats.reads,1);assert.equal(http.stats.draws,1);assert.equal(http.stats.glimmers,2);checks++;
http.state.mode='SecurityError';http.state.px=3;http.draw(2);assert.equal(http.panel.readBlocked,true);assert.equal(http.stats.glimmers,2,'a failed later read must not glimmer stale cached pixels');assert.equal(http.stats.puts,1,'a failed later read must not paint stale cached ImageData');
http.draw(3);assert.equal(http.stats.reads,2);assert.equal(http.stats.glimmers,2);assert.equal(http.stats.puts,1);checks++;
const wrong=fixture('InvalidStateError');assert.throws(()=>wrong.draw(0),e=>e.name==='InvalidStateError');assert.equal(wrong.panel.readBlocked,undefined);checks++;
const loading=fixture();loading.image.complete=false;loading.draw(0);assert.equal(loading.stats.draws,0);assert.equal(loading.stats.reads,0);assert.equal(loading.panel.drawn,undefined);checks++;
const css=readFileSync(resolve(reference,'src/styles/beat-comic.css'),'utf8');assert.match(css,/\.rl-panel__art canvas\s*\{[^}]*image-rendering:\s*pixelated/);checks++;
console.log(JSON.stringify({runtime,checks,limitation:'Actual drawPanel/posterize policy fixtures; file preview loses palette readback and glimmer for tainted image panels. Native file/HTTP comparison and artwork approval remain separate.'},null,2));