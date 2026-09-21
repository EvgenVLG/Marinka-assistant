import test from 'node:test';
import assert from 'node:assert/strict';
import {MarinkaRuntime} from '../src/runtime.mjs';
test('does not invent execution without Nest',async()=>{
  const r=await new MarinkaRuntime().turn('Turn the kitchen light on');
  assert.equal(r.kind,'action_unavailable');assert.equal(r.outcome,null);
});
test('presents Nest denial',async()=>{
  const nest={request:async()=>({outcome:'DENIED',evidence:{kind:'POLICY'}})};
  const r=await new MarinkaRuntime({nest,actor:'RESTRICTED_USER'}).turn('Turn the kitchen light on');
  assert.equal(r.outcome.outcome,'DENIED');assert.match(r.text,/not permitted/i);
});
test('conversation does not call environment authority',async()=>{
  let calls=0;const nest={request:async()=>{calls++;return {outcome:'SUCCESS'};}};
  const r=await new MarinkaRuntime({nest}).turn('hello there');
  assert.equal(r.kind,'conversation');assert.equal(calls,0);
});
