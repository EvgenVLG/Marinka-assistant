import {FixtureProvider} from './fixture-provider.mjs';
export class MarinkaRuntime{
  constructor({provider=new FixtureProvider(),nest=null,actor='STANDARD_USER'}={}){
    this.provider=provider;this.nest=nest;this.actor=actor;
  }
  async turn(text){
    const meaning=await this.provider.interpret(text);
    if(meaning.type==='conversation') return {kind:'conversation',text:meaning.reply,meaning};
    if(!this.nest) return {kind:'action_unavailable',text:'I understood the requested action, but no environment authority is connected.',meaning,outcome:null};
    const outcome=await this.nest.request({actor:this.actor,capability:meaning.capability,resource:meaning.resource,params:meaning.params});
    return {kind:'action',text:renderOutcome(outcome),meaning,outcome};
  }
}
function renderOutcome(result){
  switch(result?.outcome){
    case 'SUCCESS':return 'Done.';
    case 'DENIED':return 'That action is not permitted for this user.';
    case 'CLARIFICATION_REQUIRED':return 'I need more information before that can be done.';
    case 'FAILED':return 'The environment reported that the action failed.';
    case 'UNCERTAIN':return 'The environment cannot verify that right now.';
    default:return 'The environment does not support that request.';
  }
}
