// Admin Panel JavaScript

let allOrders = [];
let currentFilter = 'all';

// Login Functionality
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // Try to authenticate with server
        const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            loginSuccess();
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        // Fallback to simple check for demo
        if (username === 'admin' && password === 'admin123') {
            loginSuccess();
        } else {
            alert('Invalid credentials! Use: admin / admin123');
        }
    }
});

function loginSuccess() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadOrders();
}

// Logout
function logout() {
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginForm').reset();
}

// Load Orders
async function loadOrders() {
    try {
        // Try to load from server
        const response = await fetch('http://localhost:3000/api/orders');
        if (response.ok) {
            const data = await response.json();
            allOrders = data.orders;
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        // Fallback to localStorage
        console.log('Using localStorage');
        allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    }
    
    updateStats();
    displayOrders();
}

// Update Statistics
function updateStats() {
    const total = allOrders.length;
    const newOrders = allOrders.filter(o => o.status === 'new').length;
    const preparing = allOrders.filter(o => o.status === 'preparing').length;
    const delivered = allOrders.filter(o => o.status === 'delivered').length;
    
    document.getElementById('totalOrders').textContent = total;
    document.getElementById('newOrders').textContent = newOrders;
    document.getElementById('preparingOrders').textContent = preparing;
    document.getElementById('deliveredOrders').textContent = delivered;
}

// Filter Orders
function filterOrders(status) {
    currentFilter = status;
    
    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-biryani-orange', 'text-biryani-dark');
    });
    event.target.classList.add('active', 'bg-biryani-orange', 'text-biryani-dark');
    
    displayOrders();
}

// Display Orders
function displayOrders() {
    const tbody = document.getElementById('ordersTableBody');
    const noOrders = document.getElementById('noOrders');
    
    let filteredOrders = currentFilter === 'all' 
        ? allOrders 
        : allOrders.filter(o => o.status === currentFilter);
    
    if (filteredOrders.length === 0) {
        tbody.innerHTML = '';
        noOrders.classList.remove('hidden');
        return;
    }
    
    noOrders.classList.add('hidden');
    
    tbody.innerHTML = filteredOrders.map(order => `
        <tr class="hover:bg-biryani-maroon/30 transition">
            <td class="px-6 py-4 font-mono text-biryani-orange">#${order.id || 'N/A'}</td>
            <td class="px-6 py-4 text-biryani-cream">${order.customer_name}</td>
            <td class="px-6 py-4 text-biryani-cream">${order.mobile}</td>
            <td class="px-6 py-4 text-biryani-cream">${order.product || 'N/A'}</td>
            <td class="px-6 py-4 text-biryani-cream">${order.quantity}</td>
            <td class="px-6 py-4 text-biryani-yellow font-bold">₹${order.total_price}</td>
            <td class="px-6 py-4">
                <span class="status-badge status-${order.status}">${order.status}</span>
            </td>
            <td class="px-6 py-4">
                <div class="flex gap-2">
                    <button onclick="viewOrder('${order.id}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="updateStatus('${order.id}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteOrder('${order.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// View Order Details
function viewOrder(orderId) {
    const order = allOrders.find(o => o.id == orderId);
    if (!order) return;
    
    const orderDate = new Date(order.order_date).toLocaleString();
    
    document.getElementById('orderDetailsContent').innerHTML = `
        <div class="grid md:grid-cols-2 gap-4 text-biryani-cream">
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Order ID</p>
                <p class="font-bold text-biryani-yellow text-xl">#${order.id}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Status</p>
                <span class="status-badge status-${order.status}">${order.status}</span>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Customer Name</p>
                <p class="font-semibold">${order.customer_name}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Mobile</p>
                <p class="font-semibold">${order.mobile}</p>
            </div>
            <div class="md:col-span-2">
                <p class="text-sm text-biryani-cream/60 mb-1">Delivery Address</p>
                <p class="font-semibold">${order.address}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Product</p>
                <p class="font-semibold text-biryani-yellow">${order.product}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Quantity</p>
                <p class="font-semibold">${order.quantity}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Delivery Time</p>
                <p class="font-semibold">${order.delivery_time || 'N/A'}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Spice Level</p>
                <p class="font-semibold">${order.spice_level || 'Medium'}</p>
            </div>
            <div class="md:col-span-2">
                <p class="text-sm text-biryani-cream/60 mb-1">Special Instructions</p>
                <p class="font-semibold">${order.special_instructions || 'None'}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Order Date</p>
                <p class="font-semibold">${orderDate}</p>
            </div>
            <div>
                <p class="text-sm text-biryani-cream/60 mb-1">Total Amount</p>
                <p class="font-bold text-biryani-orange text-2xl">₹${order.total_price}</p>
            </div>
        </div>
    `;
    
    document.getElementById('orderModal').classList.remove('hidden');
    document.getElementById('orderModal').classList.add('flex');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.add('hidden');
    document.getElementById('orderModal').classList.remove('flex');
}

// Update Order Status
async function updateStatus(orderId) {
    const order = allOrders.find(o => o.id == orderId);
    if (!order) return;
    
    const statuses = ['new', 'preparing', 'delivering', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    if (confirm(`Change status to "${nextStatus}"?`)) {
        try {
            // Try to update on server
            const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: nextStatus })
            });
            
            if (!response.ok) throw new Error('Server error');
        } catch (error) {
            // Update in localStorage
            order.status = nextStatus;
            localStorage.setItem('orders', JSON.stringify(allOrders));
        }
        
        order.status = nextStatus;
        updateStats();
        displayOrders();
    }
}

// Delete Order
async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
        // Try to delete from server
        const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Server error');
    } catch (error) {
        // Delete from localStorage
        allOrders = allOrders.filter(o => o.id != orderId);
        localStorage.setItem('orders', JSON.stringify(allOrders));
    }
    
    allOrders = allOrders.filter(o => o.id != orderId);
    updateStats();
    displayOrders();
}

// Auto-refresh every 30 seconds
setInterval(() => {
    if (!document.getElementById('adminDashboard').classList.contains('hidden')) {
        loadOrders();
    }
}, 30000);
