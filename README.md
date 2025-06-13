# CryptocurrencyExchangeSystem# Crypto Exchange API

ระบบ API สำหรับการแลกเปลี่ยน Cryptocurrency ที่สามารถซื้อขาย และโอนเหรียญได้

## Features

- 👤 การจัดการผู้ใช้ (User Management)
- 💰 ระบบ Wallet สำหรับเก็บเหรียญและเงิน Fiat
- 📊 การตั้งคำสั่งซื้อ-ขาย (Order Management)
- 💸 การโอนเหรียญภายในและภายนอกระบบ (Transfer System)
- 📝 การบันทึกธุรกรรมทั้งหมด (Transaction Tracking)

## Installation

1. Clone repository
```bash
git clone <your-repo>
cd crypto-exchange-api
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env
# แก้ไขค่าในไฟล์ .env ให้ตรงกับ database ของคุณ
```

4. Create database
```sql
CREATE DATABASE crypto_exchange;
```

5. Create tables (ใช้ ER Diagram ที่ให้มาสร้างตาราง)

6. Seed ข้อมูลทดสอบ
```bash
npm run seed
```

7. Start server
```bash
npm start
# หรือ npm run dev สำหรับ development
```

## API Endpoints

### Users
```
POST   /api/users                    - สร้างผู้ใช้ใหม่
GET    /api/users/:id                - ดึงข้อมูลผู้ใช้
GET    /api/users/:id/wallets        - ดึง wallets ของผู้ใช้
GET    /api/users/:id/orders         - ดึง orders ของผู้ใช้
GET    /api/users/:id/transactions   - ดึง transactions ของผู้ใช้
GET    /api/users/:id/transfers/sent - ดึง transfers ที่ส่ง
GET    /api/users/:id/transfers/received - ดึง transfers ที่รับ
```

### Orders
```
POST   /api/orders                   - สร้าง order ใหม่
GET    /api/orders/:id               - ดึงข้อมูล order
GET    /api/orders/:id/transactions  - ดึง transactions ของ order
PUT    /api/orders/:id/cancel        - ยกเลิก order
GET    /api/orders/open              - ดึง orders ที่เปิดอยู่
GET    /api/orders/buy               - ดึง buy orders
GET    /api/orders/sell              - ดึง sell orders
```

### Transfers
```
POST   /api/transfers                - สร้าง transfer ใหม่
GET    /api/transfers/:id            - ดึงข้อมูล transfer
GET    /api/transfers                - ดึง transfers ทั้งหมด
GET    /api/transfers/currency/:id   - ดึง transfers ของ currency นั้น
GET    /api/transfers/internal       - ดึง internal transfers
GET    /api/transfers/external       - ดึง external transfers
```

## ตัวอย่างการใช้งาน

### สร้างผู้ใช้ใหม่
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "UserName": "testuser",
    "Email": "test@example.com",
    "Password": "password123"
  }'
```

### สร้าง Order ซื้อ BTC
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "User_Id": 1,
    "Crypto_Currency_Id": 1,
    "Fiat_Currency_Id": 5,
    "Order_Type": "BUY",
    "Amount": 0.1,
    "Price": 2200000
  }'
```

### โอนเหรียญภายใน
```bash
curl -X POST http://localhost:3000/api/transfers \
  -H "Content-Type: application/json" \
  -d '{
    "From_Wallet_Id": 1,
    "To_Wallet_Id": 5,
    "Currency_Id": 1,
    "Amount": 0.05,
    "Transfer_fee": 0.001
  }'
```

## Models และ Relations

### User Model
- `getWallets()` - ดึง wallets ของ user
- `getOrders()` - ดึง orders ของ user
- `getTransactions()` - ดึง transactions ของ user
- `getSentTransfers()` - ดึง transfers ที่ส่ง
- `getReceivedTransfers()` - ดึง transfers ที่รับ

### Order Model
- `getTransactions()` - ดึง transactions ของ order นี้
- `getBuyOrders()` - ดึง buy orders
- `getSellOrders()` - ดึง sell orders
- `cancel()` - ยกเลิก order

### Wallet Model
- `getSentTransfers()` - ดึง transfers ที่ส่งออก
- `getReceivedTransfers()` - ดึง transfers ที่รับเข้า
- `updateBalance()` - อัพเดท balance
- `addBalance()` - เพิ่ม balance
- `subtractBalance()` - ลด balance

### Transfer Model
- `getInternalTransfers()` - ดึง internal transfers
- `getExternalTransfers()` - ดึง external transfers
- `getByCurrency()` - ดึง transfers ของ currency นั้น

## ข้อมูลทดสอบ

หลังจากรัน `npm run seed` จะได้ข้อมูลทดสอบ:

- **Users**: 4 คน (john, jane, bob, alice)
- **Currencies**: BTC, ETH, XRP, DOGE, THB, USD
- **Wallets**: แต่ละ user มี wallets หลายตัว
- **Orders**: มี orders ทั้ง buy/sell/completed
- **Transfers**: ทั้ง internal และ external
- **Transactions**: ธุรกรรมที่เกิดจาก orders

รหัสผ่านทุกคนคือ: `password123`