export class NestHttpClient{
  constructor(baseUrl){this.baseUrl=String(baseUrl).replace(/\/$/,'');}
  async request(payload){
    const response=await fetch(this.baseUrl+'/api/request',{
      method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)
    });
    if(!response.ok) throw new Error('NEST_HTTP_'+response.status);
    return response.json();
  }
}
