const express=require('express');const db=require('./db');const app=express();
app.get('/api/products',(req,res)=>res.json(db.prepare('SELECT * FROM products ORDER BY id').all()));
app.get('/api/products/:id',(req,res)=>{const p=db.prepare('SELECT * FROM products WHERE id=?').get(Number(req.params.id));p?res.json(p):res.status(404).json({error:'Product not found'})});
app.listen(4001,()=>console.log('Product service: 4001'));
