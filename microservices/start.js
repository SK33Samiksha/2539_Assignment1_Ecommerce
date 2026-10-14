const {spawn}=require('child_process');const path=require('path');const children=[];
for(const file of ['product-service.js','search-service.js','cart-service.js','payment-service.js','auth-service.js','gateway.js']){
 const child=spawn(process.execPath,[path.join(__dirname,file)],{stdio:'inherit',cwd:__dirname,env:process.env});children.push(child);
 child.on('error',e=>console.error(file,e.message));
}
let stopping=false;function stop(){if(stopping)return;stopping=true;for(const child of children)if(!child.killed)child.kill();setTimeout(()=>process.exit(0),200).unref()}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
