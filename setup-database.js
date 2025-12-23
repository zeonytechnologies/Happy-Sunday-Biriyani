// Database Setup Script - Run this to manually create/reset the database
const fs = require('fs');
const path = require('path');

console.log('🗄️  Creating Sunday Biryani Database...\n');

// Create database directory
const DB_DIR = path.join(__dirname, 'database');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR);
}

console.log('✅ Database folder created: /database\n');

// Create admin file
console.log('Creating admin file...');
const ADMIN_FILE = path.join(DB_DIR, 'admin.json');
const admins = [{ username: 'admin', password: 'admin123' }];
fs.writeFileSync(ADMIN_FILE, JSON.stringify(admins, null, 2));
console.log('✅ Admin file created\n');

// Create orders file with sample data
console.log('Adding sample test orders...');
const ORDERS_FILE = path.join(DB_DIR, 'orders.json');
const sampleOrders = [
  {
    id: 'ORD' + Date.now(),
    customer_name: 'Rajesh Kumar',
    mobile: '9876543210',
    address: 'MG Road, Krishnagiri',
    product: 'Regular Pack (500g)',
    quantity: 2,
    delivery_time: '12:00 PM',
    spice_level: 'Medium',
    special_instructions: '',
    order_date: new Date().toISOString(),
    total_price: 360,
    status: 'new'
  },
  {
    id: 'ORD' + (Date.now() + 1000),
    customer_name: 'Priya Sharma',
    mobile: '9876543211',
    address: 'Anna Nagar, Krishnagiri',
    product: 'Family Pack (1kg)',
    quantity: 1,
    delivery_time: '1:00 PM',
    spice_level: 'Mild',
    special_instructions: 'Extra raitha please',
    order_date: new Date().toISOString(),
    total_price: 350,
    status: 'preparing'
  },
  {
    id: 'ORD' + (Date.now() + 2000),
    customer_name: 'Mohammed Asif',
    mobile: '9876543212',
    address: 'Gandhi Street, Krishnagiri',
    product: 'Solo Feast Combo',
    quantity: 1,
    delivery_time: '12:30 PM',
    spice_level: 'Hot',
    special_instructions: '',
    order_date: new Date().toISOString(),
    total_price: 240,
    status: 'delivered'
  }
];

fs.writeFileSync(ORDERS_FILE, JSON.stringify(sampleOrders, null, 2));
console.log('✅ Sample orders added\n');

// Display statistics
console.log('📊 Database Statistics:');
console.log('   Orders: ' + sampleOrders.length);
console.log('   Admin Users: ' + admins.length);

console.log('\n✅ Database setup complete!');
console.log('\n📁 Database location: /database folder');
console.log('   - orders.json (order data)');
console.log('   - admin.json (admin users)');
console.log('🔑 Admin login: username="admin", password="admin123"');
console.log('\n🚀 You can now run: npm start');
