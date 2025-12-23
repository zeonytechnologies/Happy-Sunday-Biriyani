// Order Form JavaScript

const productPrices = {
    regular: 180,
    family: 350,
    solo: 240,
    familyCombo: 540
};

const productNames = {
    regular: 'Regular Pack (500g)',
    family: 'Family Pack (1kg)',
    solo: 'Solo Feast Combo',
    familyCombo: 'Family Pack Combo'
};

let selectedProduct = null;
let currentSpiceLevel = 'Medium';

// Product Selection
function selectProduct(productId) {
    selectedProduct = productId;
    
    // Update radio button
    document.getElementById(productId).checked = true;
    
    // Update summary
    updateOrderSummary();
}

// Quantity Controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentQty = parseInt(qtyInput.value);
    if (currentQty < 10) {
        qtyInput.value = currentQty + 1;
        updateOrderSummary();
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
        updateOrderSummary();
    }
}

// Spice Level Selection
function selectSpiceLevel(level) {
    currentSpiceLevel = level;
    document.getElementById('spiceLevel').value = level;
    
    // Update button styles
    document.querySelectorAll('.spice-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-biryani-orange/20', 'border-biryani-orange');
        btn.classList.add('bg-biryani-dark/50', 'border-biryani-orange/30');
    });
    
    event.target.classList.remove('bg-biryani-dark/50', 'border-biryani-orange/30');
    event.target.classList.add('active', 'bg-biryani-orange/20', 'border-biryani-orange');
}

// Update Order Summary
function updateOrderSummary() {
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (selectedProduct) {
        const price = productPrices[selectedProduct];
        const total = price * quantity;
        
        document.getElementById('summaryItem').textContent = productNames[selectedProduct];
        document.getElementById('summaryQty').textContent = quantity;
        document.getElementById('summaryPrice').textContent = `₹${price}`;
        document.getElementById('summaryTotal').textContent = `₹${total}`;
    }
}

// Form Submission
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!selectedProduct) {
        alert('Please select a product!');
        return;
    }
    
    const orderData = {
        customer_name: document.getElementById('customerName').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value,
        product: productNames[selectedProduct],
        quantity: parseInt(document.getElementById('quantity').value),
        delivery_time: document.getElementById('deliveryTime').value,
        spice_level: currentSpiceLevel,
        special_instructions: document.getElementById('specialInstructions').value,
        total_price: productPrices[selectedProduct] * parseInt(document.getElementById('quantity').value),
        order_date: new Date().toISOString(),
        status: 'new'
    };
    
    try {
        // Try to save to server database first
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showSuccessModal(result.orderId);
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        // Fallback to localStorage if server is not available
        console.log('Using localStorage fallback');
        saveToLocalStorage(orderData);
    }
});

// Save to LocalStorage (fallback)
function saveToLocalStorage(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Generate order ID
    const orderId = 'ORD' + Date.now();
    orderData.id = orderId;
    
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    showSuccessModal(orderId);
}

// Show Success Modal
function showSuccessModal(orderId) {
    document.getElementById('orderIdDisplay').textContent = '#' + orderId;
    document.getElementById('successModal').classList.remove('hidden');
    document.getElementById('successModal').classList.add('flex');
    
    // Reset form
    document.getElementById('orderForm').reset();
    selectedProduct = null;
    updateOrderSummary();
}

// Close Modal
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.getElementById('successModal').classList.remove('flex');
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateOrderSummary();
});
