import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { turns, ledger, costs, rates, frame, reset, causeCount, usd } from './sequence.mjs';
test('all input breakdowns sum; cached is a subset',()=>{
  for(const t of turns) { assert.equal(t.parts.reduce((a,b)=>a+b),t.input);assert.equal(t.cached+t.uncached,t.input); }
});
test('exact per-turn costs and all intermediate cumulative categories',()=>{
  assert.deepEqual(rates,{uncached:2,cached:.2,output:8});
  assert.deepEqual(turns.map(t=>usd(costs(t).cost)),['0.01040','0.00280','0.01100']);
  assert.equal(turns.reduce((sum,t)=>sum+costs(t).cost,0),ledger(3).cost);
  for (const t of turns) assert.ok(Object.values(costs(t)).every(Number.isSafeInteger));
  assert.throws(()=>costs({uncached:0,cached:1,output:0}),RangeError);
  assert.deepEqual([0,1,2,3].map(ledger),[
    {input:0,cached:0,uncached:0,output:0,uncachedCost:0,cachedCost:0,outputCost:0,cost:0},
    {input:4000,cached:0,uncached:4000,output:300,uncachedCost:8000,cachedCost:0,outputCost:2400,cost:10400},
    {input:8400,cached:4000,uncached:4400,output:450,uncachedCost:8800,cachedCost:800,outputCost:3600,cost:13200},
    {input:13100,cached:4000,uncached:9100,output:650,uncachedCost:18200,cachedCost:800,outputCost:5200,cost:24200},
  ]);
});
test('turn boundaries, streaming and settlement use a finite playhead',()=>{
  for(const [ms,index,count] of [[0,0,0],[15999,0,0],[16000,0,1],[19999,0,1],[20000,1,1],[35999,1,1],[36000,1,2],[40000,2,2],[56000,2,3],[60000,2,3],[99999,2,3]]) {
    const s=frame(ms);assert.equal(s.index,index);assert.equal(s.completed,count);
  }
  assert.equal(frame(2000).promptFraction,.5);assert.equal(frame(10500).responseFraction,.5);
  assert.equal(frame(60001).elapsed,60000);assert.equal(frame(60000).done,true);
});
test('replay resets; reduced motion is complete, not frozen ready',()=>{
  assert.deepEqual(reset(),frame(0));assert.deepEqual(reset(true),frame(60000));assert.equal(reset().completed,0);
  assert.equal(frame(0,true).responseFraction,1);
});
test('six causes revealed at bounded times and retained',()=>{
  for(let i=0;i<6;i++){assert.equal(causeCount(i*3500),i);assert.equal(causeCount((i+1)*3500-1),i);}
  assert.equal(causeCount(25000),6);assert.equal(causeCount(99999),6);assert.equal(causeCount(0,true),6);
});
test('preview artwork bytes and sidecar content are stable across line endings',async()=>{
  const expected={
    '':'fa5f645460fd3eb7782262161d05b5bcb59fd87804624e08645dfd1419d75415',
    '.json':'23f4ba7789278dc0afd905efcdd94e6e1fa9ca2112581bdda524645192549ff1'
  };
  for(const [suffix,hash] of Object.entries(expected)) {
    const copy=await readFile(new URL(`./public/cli-controlled-action.png${suffix}`,import.meta.url));
    const content=suffix==='.json'?copy.toString('utf8').replace(/\r\n/g,'\n'):copy;
    assert.equal(createHash('sha256').update(content).digest('hex'),hash);
  }
});
