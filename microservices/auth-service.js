const express=require('express');const app=express();app.use(express.json());app.use('/api/auth',require('./auth'));app.listen(4004,()=>console.log('Auth service 4004'));
