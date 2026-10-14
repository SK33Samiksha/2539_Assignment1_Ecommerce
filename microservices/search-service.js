const express=require('express');const db=require('./db');const app=express();
app.get('/api/search',(req,res)=>{const q='%'+String(req.query.q||'').trim()+'%';res.json(db.prepare('SELECT * FROM products WHERE name LIKE ? OR category LIKE ? ORDER BY id').all(q,q))});
app.listen(4005,()=>console.log('Search service: 4005'));
