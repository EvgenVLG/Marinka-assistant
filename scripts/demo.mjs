#!/usr/bin/env node
import {MarinkaRuntime} from '../src/runtime.mjs';
const disconnected=new MarinkaRuntime();
console.log(JSON.stringify(await disconnected.turn('Turn the kitchen light on'),null,2));
const fixtureNest={async request(payload){return {correlation_id:'fixture-1',outcome:'SUCCESS',evidence:{kind:'FIXTURE',source:'demo',scope:{payload}}};}};
const connected=new MarinkaRuntime({nest:fixtureNest,actor:'ADMIN'});
console.log(JSON.stringify(await connected.turn('Turn the kitchen light on'),null,2));
