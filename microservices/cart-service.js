const express=require('express');const db=require('./db');const app=express();app.use(express.json());
app.get('/api/cart',(req,res)=>{const items=db.prepare('SELECT p.*,c.quantity,ROUND(p.price*c.quantity,2) AS subtotal FROM cart c JOIN products p ON p.id=c.product_id ORDER BY p.id').all();res.json({items,total:items.reduce((s,p)=>s+p.subtotal,0)})});
app.post('/api/cart',(req,res)=>{const id=Number(req.body?.productId);if(!db.prepare('SELECT id FROM products WHERE id=?').get(id))return res.status(400).json({error:'Invalid product'});db.prepare('INSERT INTO cart(product_id,quantity) VALUES (?,1) ON CONFLICT(product_id) DO UPDATE SET quantity=quantity+1').run(id);res.json({ok:true})});
app.delete('/api/cart/:id',(req,res)=>{db.prepare('DELETE FROM cart WHERE product_id=?').run(Number(req.params.id));res.json({ok:true})});
app.listen(4002,()=>console.log('Cart service: 4002'));
