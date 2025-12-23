# 🍛 Namma Krishnagiri Sunday Biryani Website

A funky, festive restaurant website for Sunday-special chicken biryani delivery service in Krishnagiri.

## 🎨 Features

- **Multi-page website** with 7 fully functional pages
- **Funky design** inspired by the provided poster (deep maroon/orange color scheme)
- **Fully responsive** - mobile-first design
- **Order management system** with admin panel
- **SQLite database** backend with LocalStorage fallback
- **Smooth animations** and playful UI elements
- **WhatsApp integration** for quick ordering

## 📁 Project Structure

```
SUNDAY BIRIYANI/
├── index.html              # Home page with hero section
├── about.html              # About our story
├── menu.html               # Menu with pricing
├── speciality.html         # What makes us special
├── order.html              # Order form
├── admin.html              # Admin panel
├── contact.html            # Contact page
├── server.js               # Node.js + Express + SQLite backend
├── package.json            # Node dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── biryani_orders.db       # SQLite database (auto-created)
├── assets/
│   ├── css/
│   │   └── custom.css      # Custom animations & styles
│   └── js/
│       ├── main.js         # Common JavaScript
│       ├── order.js        # Order form logic
│       └── admin.js        # Admin panel logic
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: Simple HTML (Without Backend)

1. **Open directly in browser:**
   - Double-click `index.html` to view the website
   - The site will use LocalStorage for data persistence
   - All features work except real-time database sync

### Option 2: Full Setup (With Backend Server)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/

2. **Install dependencies:**
   ```powershell
   cd "C:\Users\91636\Downloads\SUNDAY BIRIYANI"
   npm install
   ```

3. **Start the server:**
   ```powershell
   npm start
   ```

4. **Open in browser:**
   - Visit: `http://localhost:3000`

## 🎯 Pages Overview

### 1. Home Page (index.html)
- Eye-catching hero section with "Happy Sunday Biryani" branding
- Animated elements (steam, floating ingredients)
- Coming Soon badge
- Feature highlights
- CTA buttons for ordering

### 2. About Page (about.html)
- Story of Namma Krishnagiri Biryani
- Why Sunday-only concept
- Our values and traditions
- Krishnagiri heritage showcase

### 3. Menu Page (menu.html)
- Main biryani options with detailed cards
- Add-ons (Extra Chicken, Raitha, Salna)
- Combo deals with savings
- Spice level indicators
- Pricing for all items

### 4. Speciality Page (speciality.html)
- 6-step cooking timeline
- What makes us different
- Quality promises
- Customer testimonials
- Unique differentiators

### 5. Order Page (order.html)
- Complete order form with validation
- Product selection with radio buttons
- Quantity controls
- Spice level customization
- Delivery time selection
- Order summary with live pricing
- WhatsApp quick order button

### 6. Admin Panel (admin.html)
- Secure login (demo: admin/admin123)
- Dashboard with statistics
- Order management table
- Status update functionality
- Filter orders by status
- View detailed order information
- Delete orders

### 7. Contact Page (contact.html)
- Contact information cards
- WhatsApp integration
- Contact form
- FAQ section with toggles
- Social media links
- Operating hours

## 🎨 Design Features

### Color Palette (From Poster)
- **Primary:** Deep Maroon (#4A1515, #6B1D1D)
- **Accent:** Orange (#FF8C42) & Yellow (#FFD447)
- **Background:** Dark Brown (#2B0A0A)
- **Text:** Cream (#FFF8E7)

### Animations
- Page fade-in on load
- Floating elements
- Steam effects
- Card hover lift
- Button hover effects
- Bounce animations
- WhatsApp pulse effect
- Scroll reveal

### Typography
- **Headings:** Berkshire Swash (cursive, funky)
- **Body:** Poppins (clean, readable)
- Bold, playful spacing

## 📦 Order Management

### Customer Flow:
1. Browse menu
2. Fill order form
3. Select product, quantity, spice level
4. Submit order
5. Receive order confirmation with Order ID

### Admin Flow:
1. Login to admin panel
2. View all orders with statistics
3. Filter by status
4. Update order status (New → Preparing → Delivering → Delivered)
5. View detailed order information
6. Delete orders if needed

### Order Status Types:
- **New** - Just placed
- **Preparing** - Being cooked
- **Delivering** - Out for delivery
- **Delivered** - Completed

## 💾 Database

### SQLite Tables:

**orders table:**
- id (Primary Key)
- customer_name
- mobile
- address
- quantity
- delivery_time
- order_date
- status
- total_price

**admin_users table:**
- id (Primary Key)
- username
- password

### Default Admin Credentials:
- Username: `admin`
- Password: `admin123`

## 🔧 Technologies Used

- **HTML5** - Structure
- **Tailwind CSS** (CDN) - Styling
- **Vanilla JavaScript** - Interactivity
- **Node.js + Express** - Backend server
- **SQLite (better-sqlite3)** - Database
- **LocalStorage** - Fallback storage
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📱 Responsive Design

The website is fully responsive and tested on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## ⚙️ Configuration

### Update Phone Number:
Replace all instances of `919876543210` with your WhatsApp number in:
- index.html
- menu.html
- order.html
- contact.html

### Update Location:
Search for "Krishnagiri" in all HTML files and update as needed.

### Modify Prices:
Edit the `productPrices` object in `assets/js/order.js`:
```javascript
const productPrices = {
    regular: 180,
    family: 350,
    solo: 240,
    familyCombo: 540
};
```

## 🚀 Deployment

### For Static Hosting (Netlify, Vercel):
- Upload all HTML, CSS, JS files
- Site will use LocalStorage for orders

### For Full Backend (Heroku, Railway):
- Push entire project including `server.js`
- Ensure Node.js buildpack is configured
- Set environment variables if needed

## 📝 Future Enhancements

- [ ] Online payment integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] SMS order confirmations
- [ ] Customer order tracking page
- [ ] Image gallery
- [ ] Review/rating system
- [ ] Social media feed integration
- [ ] Multi-language support

## 🐛 Troubleshooting

**Issue:** Orders not saving
- **Solution:** Check if server is running or browser has LocalStorage enabled

**Issue:** Admin login not working
- **Solution:** Use credentials: admin/admin123

**Issue:** Styles not loading
- **Solution:** Ensure internet connection (Tailwind CDN requires internet)

## 📞 Support

For any issues or questions:
- WhatsApp: +91 98765 43210
- Email: support@sundaybiryani.com

## 📄 License

This project is created for Namma Krishnagiri Chicken Biryani. All rights reserved.

---

**Made with ❤️ and lots of biryani love! 🍛**

Enjoy your Sunday Biryani! 🎉
