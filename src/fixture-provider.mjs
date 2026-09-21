export class FixtureProvider{
  async interpret(text){
    const n=String(text||'').trim().toLowerCase();
    if(/turn .*kitchen.*light.*on|kitchen.*light.*on/.test(n)) return {type:'action',capability:'light.set',resource:'kitchen',params:{on:true}};
    if(/turn .*kitchen.*light.*off|kitchen.*light.*off/.test(n)) return {type:'action',capability:'light.set',resource:'kitchen',params:{on:false}};
    if(/who.*home|who is home|presence/.test(n)) return {type:'action',capability:'presence.read',resource:'presence',params:{}};
    return {type:'conversation',reply:`Fixture Marinka heard: ${String(text||'').trim()}`};
  }
}
