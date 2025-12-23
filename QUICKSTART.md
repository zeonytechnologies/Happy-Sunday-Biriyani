# Quick Start Guide - Sunday Biryani Website

## 🚀 Super Quick Start (No Installation)

**Just want to see the website?**
1. Double-click `index.html`
2. Your browser will open the website
3. That's it! Browse all pages and place test orders

> Orders will be saved in your browser's LocalStorage

---

## 💻 Full Setup with Database (Recommended)

### Step 1: Install Node.js
- Download from: https://nodejs.org/
- Install with default settings
- Restart your computer

### Step 2: Open PowerShell
1. Press `Windows + X`
2. Click "Windows PowerShell" or "Terminal"
3. Navigate to project folder:
   ```powershell
   cd "C:\Users\91636\Downloads\SUNDAY BIRIYANI"
   ```

### Step 3: Install Dependencies
```powershell
npm install
```
Wait for installation to complete (30-60 seconds)

### Step 4: Start the Server
```powershell
npm start
```

You should see:
```
🍛 Sunday Biryani Server running on http://localhost:3000
📊 Database: biryani_orders.db
👤 Default Admin: username="admin", password="admin123"
```

### Step 5: Open Website
1. Open your browser
2. Go to: `http://localhost:3000`
3. Enjoy! 🎉

---

## 🧪 Test the Website

### Place a Test Order:
1. Click "Order Now" button
2. Fill in your details
3. Select a biryani pack
4. Submit order
5. Note your Order ID

### Access Admin Panel:
1. Go to: `http://localhost:3000/admin.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. View your test order!

---

## 📱 Test on Mobile

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On your phone's browser, go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   (Replace YOUR_IP_ADDRESS with actual IP)

---

## ❓ Common Issues

### "npm is not recognized"
- **Solution:** Install Node.js and restart computer

### "Port 3000 is already in use"
- **Solution:** Change port in server.js (line 8):
  ```javascript
  const PORT = 3001; // Change to 3001 or any free port
  ```

### Website looks broken
- **Solution:** Make sure you have internet connection (Tailwind CSS uses CDN)

### Can't see orders in admin
- **Solution:** Make sure server is running, or check browser's LocalStorage

---

## 🎯 Next Steps

1. **Customize:** Update phone numbers, location, prices
2. **Add Images:** Replace emoji placeholders with real food photos
3. **Deploy:** Upload to hosting service when ready

---

## 📞 Need Help?

Check the full README.md for detailed documentation!

**Happy Biryani Selling! 🍛🎉**
