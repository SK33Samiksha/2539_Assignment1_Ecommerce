# 2539_Assignment1_Ecommerce — ShopEasy

Two versions of the same functional e-commerce demo: monolithic and microservices.

## Requirements
- Node.js **22.13 or later** (microservices use built-in `node:sqlite`), npm
- Internet connection for remote product photographs

## Run Monolithic
```powershell
cd monolithic
npm install
npm start
```
Open **http://localhost:3000**.

## Run Microservices
In a separate terminal, from the project root:
```powershell
cd microservices
npm install
npm start
```
Open **http://localhost:3001**. Both versions can run at once.

## Microservices architecture
Browser → API Gateway (**3001**) → individual Express servers:

| Feature | Port | API |
|---|---:|---|
| Product | 4001 | GET `/api/products` |
| Search | 4005 | GET `/api/search?q=watch` |
| Cart | 4002 | GET/POST/DELETE `/api/cart` |
| Payment | 4003 | POST `/api/payment` |
| Authentication | 4004 | `/api/auth/signup`, `/login`, `/me`, `/logout` |

**One shared SQLite database:** `microservices/ecommerce.sqlite` is automatically created on first run by `db.js`. All five services connect to it directly. It contains `products`, `cart`, `orders`, `users`, and `sessions`. SQLite WAL mode permits multiple processes to access the file. Data persists across restarts. This is a **shared-database educational architecture**, not database-per-service isolation.

The API Gateway proxies each `/api/<feature>` request to its own service. Frontend search sends a request to the dedicated Search API. Product listing uses the Product API.

## Test workflow
1. Home → View All Products → Shop → Product details.
2. Search for `watch` using the search bar (Search Service).
3. Add a product to Cart; view or remove it.
4. Signup → Account → Logout → Login.
5. Cart → Checkout → Place demo order → Order confirmation.
6. Restart microservices; signup data, orders, and cart remain in the shared SQLite database.

## Notes
- **Demo only**: payments are simulated. Never enter real payment credentials.
- Cart is shared among all visitors for simplicity; this is not production-grade multi-user isolation.
- Monolithic retains its original lightweight storage; the shared SQLite database is used by the Microservices version.
- `ecommerce.sqlite` is ignored by Git and will be created automatically on each machine.
- Screenshots for your assignment should show both apps and their working features.
