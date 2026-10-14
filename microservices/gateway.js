const express=require('express');const path=require('path');const {createProxyMiddleware}=require('http-proxy-middleware');const app=express();
const services={products:4001,cart:4002,payment:4003,auth:4004,search:4005};
for(const [name,port] of Object.entries(services))app.use(createProxyMiddleware({pathFilter:p=>p==='/api/'+name||p.startsWith('/api/'+name+'/'),target:'http://127.0.0.1:'+port,changeOrigin:true,on:{error:(err,req,res)=>{if(!res.headersSent)res.writeHead(502,{'Content-Type':'application/json'}).end(JSON.stringify({error:name+' service unavailable'}))}}}));
app.use(express.static(path.join(__dirname,'frontend')));
const port=Number(process.env.PORT||3001);app.listen(port,()=>console.log('ShopEasy microservices gateway: http://localhost:'+port));
