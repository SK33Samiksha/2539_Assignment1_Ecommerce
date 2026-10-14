// Shared SQLite database, accessed independently by each microservice. Requires Node.js 22.13+.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const db = new DatabaseSync(path.join(__dirname, 'ecommerce.sqlite'), {timeout: 5000});
db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;');
db.exec(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL, image TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, salt TEXT NOT NULL, password_hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS cart (product_id INTEGER PRIMARY KEY, quantity INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, total REAL NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);`);
if (db.prepare('SELECT COUNT(*) AS n FROM products').get().n === 0) {
 const insert = db.prepare('INSERT INTO products (id,name,category,price,image) VALUES (?,?,?,?,?)');
 for(const p of require('./products.json')) insert.run(p.id,p.name,p.category,p.price,p.image);
}
module.exports=db;
