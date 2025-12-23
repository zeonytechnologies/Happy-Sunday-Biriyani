// SQL-Based Server using sql.js (Pure JavaScript SQLite - No Compilation Needed!)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Database file path
const DB_FILE = path.join(__dirname, 'biryani_orders.db');

let db;

// Initialize SQL.js Database
async function initDatabase() {
    const SQL = await initSqlJs();
    
    // Load existing database or create new one
    if (fs.existsSync(DB_FILE)) {
        const buffer = fs.readFileSync(DB_FILE);
        db = new SQL.Database(buffer);
        console.log('✅ Loaded existing database');
    } else {
        db = new SQL.Database();
        console.log('✅ Created new database');
        
        // Create tables
        db.run(`
            CREATE TABLE orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id TEXT UNIQUE NOT NULL,
                customer_name TEXT NOT NULL,
                mobile TEXT NOT NULL,
                address TEXT NOT NULL,
                product TEXT,
                quantity INTEGER NOT NULL,
                delivery_time TEXT,
                spice_level TEXT DEFAULT 'Medium',
                special_instructions TEXT,
                order_date TEXT DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new',
                total_price REAL DEFAULT 0
            )
        `);
        
        db.run(`
            CREATE TABLE admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        
        db.run(`
            CREATE TABLE contact_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT NOT NULL,
                submitted_date TEXT DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new'
            )
        `);
        
        // Insert default admin
        db.run("INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123')");
        
        // Save to file
        saveDatabase();
        console.log('✅ Database tables created');
    }
}

// Save database to file
function saveDatabase() {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
}

// API Routes

// Get all orders
app.get('/api/orders', (req, res) => {
    try {
        const result = db.exec('SELECT * FROM orders ORDER BY id DESC');
        const orders = result.length > 0 ? result[0].values.map(row => {
            const columns = result[0].columns;
            const order = {};
            columns.forEach((col, i) => {
                order[col] = row[i];
            });
            return order;
        }) : [];
        
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single order
app.get('/api/orders/:id', (req, res) => {
    try {
        const result = db.exec('SELECT * FROM orders WHERE order_id = ?', [req.params.id]);
        
        if (result.length > 0 && result[0].values.length > 0) {
            const columns = result[0].columns;
            const row = result[0].values[0];
            const order = {};
            columns.forEach((col, i) => {
                order[col] = row[i];
            });
            res.json({ success: true, order });
        } else {
            res.status(404).json({ success: false, error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new order
app.post('/api/orders', (req, res) => {
    try {
        const orderId = 'ORD' + Date.now();
        const { customer_name, mobile, address, product, quantity, delivery_time, spice_level, special_instructions, total_price } = req.body;
        
        db.run(`
            INSERT INTO orders (order_id, customer_name, mobile, address, product, quantity, delivery_time, spice_level, special_instructions, total_price, order_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `, [orderId, customer_name, mobile, address, product, quantity, delivery_time, spice_level || 'Medium', special_instructions, total_price]);
        
        saveDatabase();
        
        res.json({ 
            success: true, 
            orderId: orderId,
            message: 'Order placed successfully!' 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
    try {
        const { status } = req.body;
        db.run('UPDATE orders SET status = ? WHERE order_id = ?', [status, req.params.id]);
        saveDatabase();
        res.json({ success: true, message: 'Order status updated' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
    try {
        db.run('DELETE FROM orders WHERE order_id = ?', [req.params.id]);
        saveDatabase();
        res.json({ success: true, message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const result = db.exec('SELECT * FROM admin_users WHERE username = ? AND password = ?', [username, password]);
        
        if (result.length > 0 && result[0].values.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        db.run(`
            INSERT INTO contact_messages (name, email, phone, message, submitted_date)
            VALUES (?, ?, ?, ?, datetime('now'))
        `, [name, email, phone || null, message]);
        
        saveDatabase();
        
        res.json({ 
            success: true, 
            message: 'Thank you for your message! We\'ll get back to you soon. 🙏'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all contact messages (for admin)
app.get('/api/contact', (req, res) => {
    try {
        const result = db.exec('SELECT * FROM contact_messages ORDER BY id DESC');
        const messages = result.length > 0 ? result[0].values.map(row => {
            const columns = result[0].columns;
            const msg = {};
            columns.forEach((col, i) => {
                msg[col] = row[i];
            });
            return msg;
        }) : [];
        
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('\n========================================');
        console.log(`🍛 Sunday Biryani Server Running!`);
        console.log(`========================================`);
        console.log(`🌐 URL: http://localhost:${PORT}`);
        console.log(`📊 Database: biryani_orders.db (SQL-based)`);
        console.log(`🗄️  Database Type: SQLite (via sql.js)`);
        console.log(`👤 Admin: username="admin", password="admin123"`);
        console.log(`✅ Pure JavaScript - No compilation needed!`);
        console.log(`========================================\n`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
});
