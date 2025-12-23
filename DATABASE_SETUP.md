# 🗄️ Database Setup Guide

## Quick Answer
The SQLite database (**biryani_orders.db**) is created **automatically** in the same folder when you start the server!

---

## 🚀 Method 1: Automatic Creation (Easiest)

Just start the server and the database is created automatically:

```powershell
npm start
```

The `biryani_orders.db` file will appear in your project folder!

---

## 🔧 Method 2: Manual Setup with Sample Data

If you want to manually create the database with sample test orders:

### Step 1: Run the setup script
```powershell
node setup-database.js
```

### Step 2: Start the server
```powershell
npm start
```

---

## 📊 Database Structure

### Table: `orders`
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  product TEXT,
  quantity INTEGER NOT NULL,
  delivery_time TEXT,
  spice_level TEXT DEFAULT 'Medium',
  special_instructions TEXT,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new',
  total_price REAL DEFAULT 0
)
```

### Table: `admin_users`
```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)
```

---

## 🔍 How to Verify Database was Created

### Option A: Check File Explorer
Look for `biryani_orders.db` in your project folder:
```
C:\Users\91636\Downloads\SUNDAY BIRIYANI\biryani_orders.db
```

### Option B: Use SQLite Browser (Optional)
1. Download: https://sqlitebrowser.org/
2. Open `biryani_orders.db` with DB Browser
3. View tables and data

### Option C: Use PowerShell
```powershell
# Check if file exists
Test-Path "biryani_orders.db"
```

---

## 📝 Database Location

The database file is stored in the **same folder** as your project:

```
SUNDAY BIRIYANI/
├── biryani_orders.db  ← YOUR DATABASE FILE (auto-created)
├── server.js
├── index.html
└── ...
```

---

## 🎯 Quick Test

1. **Start server:**
   ```powershell
   npm start
   ```

2. **Place an order:**
   - Go to: http://localhost:3000/order.html
   - Fill form and submit

3. **Check in admin:**
   - Go to: http://localhost:3000/admin.html
   - Login: admin / admin123
   - See your order!

4. **Check database file:**
   - Look in folder for `biryani_orders.db`
   - It's there! ✅

---

## 💡 Pro Tips

### Reset Database
Delete `biryani_orders.db` and restart server - fresh database created!

### Backup Database
Just copy `biryani_orders.db` to another location

### View Data
Use any SQLite viewer or run:
```powershell
node setup-database.js
```

---

## ❓ Troubleshooting

**Database not created?**
- Make sure you ran `npm install` first
- Check `better-sqlite3` is installed
- Run `node setup-database.js` manually

**Can't find database file?**
- It's in the same folder as `server.js`
- Look for: `biryani_orders.db`
- Hidden files might be hidden in Windows

**Orders not saving?**
- Check server is running
- Check console for errors
- Fallback: Orders save to browser LocalStorage

---

## 🎉 That's It!

Your SQLite database is ready to store orders in the same folder as your project. No external database server needed!

**Database File:** `biryani_orders.db`
**Location:** Same folder as your website files
**Type:** SQLite (file-based SQL database)
