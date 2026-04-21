// ========== DATA PRODUK ==========
const products = [
    { id: 1, name: "Romantic Rose", price: 350000, oldPrice: 450000, image: "rose.jpg", category: "Romantic", rating: 5, isBestSeller: true },
    { id: 2, name: "Lavender Dreams", price: 280000, oldPrice: 380000, image: "lavender.jpg", category: "Lavender", rating: 4.5, isBestSeller: false },
    { id: 3, name: "Sunny Sunflower", price: 220000, oldPrice: 320000, image: "sun.jpg", category: "Sunflower", rating: 5, isBestSeller: true },
    { id: 4, name: "Elegant Lily", price: 380000, oldPrice: 480000, image: "lily.jpg", category: "Elegant", rating: 5, isBestSeller: false },
    { id: 5, name: "Cherry Blossom", price: 320000, oldPrice: 420000, image: "sakura.jpg", category: "Cherry", rating: 4.5, isBestSeller: true },
    { id: 6, name: "Purple Orchid", price: 420000, oldPrice: 550000, image: "anggrek.jpg", category: "Orchid", rating: 5, isBestSeller: false }
];

// ========== DATA TESTIMONI ==========
const testimonials = [
    { id: 1, name: "M. Fajar Sahaputra", image: "mixxiw.jpg", text: "Bunga yang saya pesan sangat segar dan cantik! Pengiriman tepat waktu, packing rapi. Sangat recommended!", rating: 5 },
    { id: 2, name: "Mandalika Puspa Sakartika", image: "legoo.jpg", text: "Pelayanannya ramah, rangkaian bunganya indah banget. Harga bersaing dan sesuai dengan kualitas. Makasih Bloomly!", rating: 5 },
    { id: 3, name: "William Jaka Pratama", image: "willii.jpg", text: "Website nya mudah digunakan, proses checkout cepat. Bunganya fresh dan tahan lama. Puas sekali!", rating: 4.5 },
    { id: 4, name: "Bonnie Efrike Stefiana", image: "bonnie.jpg", text: "Buket bunganya super cantik! Pacar saya sangat suka. Terima kasih Bloomly!", rating: 5 },
    { id: 5, name: "Maulana Wahidin Akbar", image: "first.jpg", text: "Pengiriman cepat, bunga harum dan segar. Saya akan order lagi pasti!", rating: 5 },
    { id: 6, name: "Jemima Nazuella Putri", image: "nana.jpg", text: "Bunganya mekar sempurna, wangi yang membawa kebahagiaan. Terima kasih!", rating: 5 }
];

// ========== KERANJANG (LOCAL STORAGE) ==========
let cart = JSON.parse(localStorage.getItem('flowerCart') || '[]');

// ========== LOAD PRODUK ==========
function loadProducts() {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;
    
    productsList.innerHTML = products.map(p => `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
            <div class="product-card">
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="product-overlay">
                        <button class="quick-view" onclick="quickView(${p.id})">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                    ${p.isBestSeller ? '<span class="product-badge">Best Seller ✨</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <div class="rating">${getStarRating(p.rating)}</div>
                    <div class="product-price">
                        <span>Rp ${p.price.toLocaleString('id-ID')}</span>
                        <del>Rp ${p.oldPrice.toLocaleString('id-ID')}</del>
                    </div>
                    <button class="btn btn-primary w-100" onclick="addToCart(${p.id})">
                        <i class="fas fa-shopping-bag"></i> Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== LOAD TESTIMONI ==========
function loadTestimonials() {
    const list = document.getElementById('testimonials-list');
    if (!list) return;
    
    list.innerHTML = testimonials.map(t => `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
            <div class="testimonial-card">
                <img src="${t.image}" class="testimonial-img" alt="${t.name}">
                <div class="testimonial-text">
                    <i class="fas fa-quote-left me-2" style="color:#9B59B6"></i> ${t.text}
                </div>
                <div class="testimonial-name">${t.name}</div>
                <div class="testimonial-rating">${getStarRating(t.rating)}</div>
            </div>
        </div>
    `).join('');
}

// ========== FUNGSI BINTANG RATING ==========
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= Math.floor(rating); i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (rating % 1 !== 0) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}

// ========== TAMBAH KE KERANJANG ==========
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    cart.push(product);
    localStorage.setItem('flowerCart', JSON.stringify(cart));
    updateCartCount();
    
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
    
    Swal.fire({
        title: '🌷 Ditambahkan!',
        text: `${product.name} masuk ke keranjang`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
    });
}

// ========== UPDATE JUMLAH KERANJANG ==========
function updateCartCount() {
    const count = cart.length;
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// ========== TAMPILKAN KERANJANG ==========
function showCart() {
    if (cart.length === 0) {
        Swal.fire({
            title: '🌸 Keranjang Kosong',
            text: 'Yuk belanja bunga cantik!',
            icon: 'info',
            confirmButtonColor: '#9B59B6'
        });
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    Swal.fire({
        title: '🌸 Keranjang Belanja',
        html: `
            <div style="max-height:400px;overflow-y:auto">
                ${cart.map((item, index) => `
                    <div class="d-flex align-items-center mb-2 pb-2 border-bottom">
                        <img src="${item.image}" style="width:50px;height:50px;border-radius:10px;object-fit:cover" class="me-3">
                        <div class="flex-grow-1 text-start">
                            <h6 class="mb-0">${item.name}</h6>
                            <small>Rp ${item.price.toLocaleString()}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger rounded-circle" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
                <div class="mt-3 pt-2 border-top">
                    <div class="d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong style="color:#9B59B6">Rp ${total.toLocaleString()}</strong>
                    </div>
                </div>
            </div>
        `,
        confirmButtonText: 'Checkout 🛍️',
        cancelButtonText: 'Lanjut Belanja',
        showCancelButton: true,
        confirmButtonColor: '#9B59B6',
        cancelButtonColor: '#BA55D3'
    }).then(result => {
        if (result.isConfirmed) {
            checkout();
        }
    });
}

// ========== HAPUS DARI KERANJANG ==========
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('flowerCart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// ========== GENERATE ORDER ID ==========
function generateOrderId() {
    return 'BLM-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// ========== SIMPAN ORDER ==========
function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orders.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orders));
}

// ========== TAMPILKAN QRIS PAYMENT ==========
function showQRISPayment(orderId, total, orderData) {
    Swal.fire({
        title: '💳 Pembayaran QRIS',
        html: `
            <div class="text-center">
                <div class="alert alert-info">
                    <strong>Order ID:</strong> ${orderId}
                </div>
                <h3 class="text-primary">Rp ${total.toLocaleString()}</h3>
                <div style="background:white;padding:15px;border-radius:15px;display:inline-block">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(orderId + '|' + total + '|Bloomly')}" style="width:180px">
                </div>
                <p class="mt-2 small">Scan QR Code menggunakan mobile banking atau e-wallet</p>
                <div class="alert alert-warning small">
                    <i class="fas fa-clock"></i> Bayar dalam 30 menit
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Saya Sudah Bayar',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#e55a8a'
    }).then(result => {
        if (result.isConfirmed) {
            orderData.status = 'paid';
            orderData.paymentMethod = 'QRIS';
            saveOrder(orderData);
            Swal.fire({
                title: '✅ Pembayaran Berhasil!',
                text: 'Pesanan akan segera diproses',
                icon: 'success',
                confirmButtonColor: '#9B59B6'
            }).then(() => {
                showTracking(orderData.orderId);
            });
        }
    });
}

// ========== PROSES CHECKOUT ==========
function checkout() {
    if (cart.length === 0) return;
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    Swal.fire({
        title: '🌷 Checkout',
        html: `
            <form id="checkoutForm">
                <div class="mb-3 text-start">
                    <input type="text" id="checkoutName" class="form-control" placeholder="Nama Lengkap" required>
                </div>
                <div class="mb-3 text-start">
                    <input type="text" id="checkoutAddress" class="form-control" placeholder="Alamat Lengkap" required>
                </div>
                <div class="mb-3 text-start">
                    <input type="tel" id="checkoutPhone" class="form-control" placeholder="No. Telepon" required>
                </div>
                <div class="mb-3 text-start">
                    <select id="checkoutPayment" class="form-select">
                        <option value="qris">💳 QRIS (Scan QR Code)</option>
                        <option value="cod">💰 COD (Bayar di Tempat)</option>
                    </select>
                </div>
                <div class="alert alert-info text-center" style="background:#F3EDF7;border:none;border-radius:10px">
                    <strong>Total: Rp ${total.toLocaleString('id-ID')}</strong>
                </div>
            </form>
        `,
        confirmButtonText: 'Pesan Sekarang 💐',
        cancelButtonText: 'Batal',
        showCancelButton: true,
        confirmButtonColor: '#9B59B6',
        cancelButtonColor: '#BA55D3',
        preConfirm: () => {
            const name = document.getElementById('checkoutName').value;
            const address = document.getElementById('checkoutAddress').value;
            const phone = document.getElementById('checkoutPhone').value;
            
            if (!name || !address || !phone) {
                Swal.showValidationMessage('Mohon isi semua data!');
                return false;
            }
            return { name, address, phone, payment: document.getElementById('checkoutPayment').value };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const orderId = generateOrderId();
            const orderData = {
                orderId: orderId,
                customerName: result.value.name,
                customerAddress: result.value.address,
                customerPhone: result.value.phone,
                paymentMethod: result.value.payment === 'qris' ? 'QRIS' : 'COD',
                total: total,
                items: [...cart],
                status: 'pending',
                date: new Date().toLocaleString('id-ID')
            };
            
            if (result.value.payment === 'qris') {
                showQRISPayment(orderId, total, orderData);
            } else {
                saveOrder(orderData);
                Swal.fire({
                    title: '🌸 Pesanan Berhasil!',
                    html: `
                        <div class="text-center">
                            <i class="fas fa-check-circle" style="font-size: 50px; color: #10B981;"></i>
                            <p class="mt-3">Terima kasih ${result.value.name}!</p>
                            <p>Pesanan akan segera diproses.</p>
                            <p class="text-muted small">Order ID: ${orderId}</p>
                        </div>
                    `,
                    icon: 'success',
                    confirmButtonColor: '#9B59B6',
                    confirmButtonText: 'Lacak Pesanan'
                }).then(() => {
                    showTracking(orderId);
                });
            }
            
            localStorage.removeItem('flowerCart');
            cart = [];
            updateCartCount();
        }
    });
}

// ========== TAMPILKAN RIWAYAT PESANAN ==========
function showOrderHistory() {
    let orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    if (orders.length === 0) {
        Swal.fire({
            title: '📋 Riwayat Kosong',
            text: 'Belum ada pesanan',
            icon: 'info',
            confirmButtonColor: '#9B59B6'
        });
        return;
    }
    
    Swal.fire({
        title: '📋 Riwayat Pesanan',
        html: `
            <div style="max-height:500px;overflow-y:auto">
                ${orders.map(o => `
                    <div class="card mb-2 p-2" style="border-left:4px solid ${o.status === 'paid' ? '#10B981' : '#F59E0B'}">
                        <div class="d-flex justify-content-between">
                            <strong>${o.orderId}</strong>
                            <span class="badge bg-${o.status === 'paid' ? 'success' : 'warning'}">
                                ${o.status === 'paid' ? 'Lunas' : 'Pending'}
                            </span>
                        </div>
                        <small>${o.date}</small>
                        <small>Total: Rp ${o.total.toLocaleString()}</small>
                        <button class="btn btn-sm btn-outline-primary mt-1" onclick="trackOrder('${o.orderId}')">
                            <i class="fas fa-map-marker-alt"></i> Lacak Pesanan
                        </button>
                    </div>
                `).join('')}
            </div>
        `,
        width: '500px',
        confirmButtonColor: '#9B59B6',
        confirmButtonText: 'Tutup'
    });
}

// ========== LACAK PESANAN ==========
function trackOrder(orderId) {
    showTracking(orderId);
}

function showTracking(orderId) {
    let orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    let order = orders.find(o => o.orderId === orderId);
    let statusIndex = order ? (order.status === 'paid' ? 2 : 1) : 1;
    
    Swal.fire({
        title: '🚚 Lacak Pesanan',
        html: `
            <div class="text-start">
                <div class="tracking-step ${statusIndex >= 1 ? 'completed' : ''}">
                    <div class="tracking-icon"><i class="fas fa-check-circle"></i></div>
                    <div>
                        <strong>Pesanan Diterima</strong><br>
                        <small>${order?.date || 'Belum diproses'}</small>
                    </div>
                </div>
                <div class="tracking-line"></div>
                <div class="tracking-step ${statusIndex >= 2 ? 'completed' : statusIndex === 1 ? 'active' : ''}">
                    <div class="tracking-icon"><i class="fas fa-box"></i></div>
                    <div>
                        <strong>Sedang Dikemas</strong><br>
                        <small>Florist sedang merangkai bunga</small>
                    </div>
                </div>
                <div class="tracking-line"></div>
                <div class="tracking-step ${statusIndex >= 3 ? 'completed' : ''}">
                    <div class="tracking-icon"><i class="fas fa-truck"></i></div>
                    <div>
                        <strong>Dalam Perjalanan</strong><br>
                        <small>Kurir menuju lokasi Anda</small>
                    </div>
                </div>
                <div class="tracking-line"></div>
                <div class="tracking-step">
                    <div class="tracking-icon"><i class="fas fa-home"></i></div>
                    <div>
                        <strong>Pesanan Sampai</strong><br>
                        <small>Buket bunga di tangan Anda 🌸</small>
                    </div>
                </div>
            </div>
        `,
        width: '450px',
        confirmButtonColor: '#9B59B6',
        confirmButtonText: 'Tutup'
    });
}

// ========== QUICK VIEW PRODUK ==========
function quickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    Swal.fire({
        title: product.name,
        html: `
            <div class="text-center">
                <img src="${product.image}" style="width:180px;height:180px;border-radius:15px;object-fit:cover">
                <div class="rating mt-2">${getStarRating(product.rating)}</div>
                <h4 class="text-primary mt-2" style="color:#9B59B6!important">Rp ${product.price.toLocaleString()}</h4>
                <p><del class="text-muted">Rp ${product.oldPrice.toLocaleString()}</del></p>
                <button class="btn btn-primary" onclick="addToCart(${product.id}); Swal.close();">
                    <i class="fas fa-shopping-bag"></i> Tambah ke Keranjang
                </button>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        background: '#FFFFFF'
    });
}

// ========== INIT MAP (LEAFLET) ==========
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    const map = L.map('map').setView([-6.2088, 106.8456], 13);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    const shopIcon = L.divIcon({
        html: '<i class="fas fa-store" style="font-size:30px;color:#9B59B6;text-shadow:0 0 5px white"></i>',
        className: 'custom-div-icon',
        iconSize: [30, 30],
        popupAnchor: [0, -15]
    });
    
    L.marker([-6.2088, 106.8456], { icon: shopIcon }).addTo(map)
        .bindPopup('<b>🌸 Bloomly Flower Shop</b><br>Jl. Bunga Indah No. 123, Jakarta<br>✨ Toko Bunga Terbaik ✨')
        .openPopup();
    
    L.circle([-6.2088, 106.8456], {
        color: '#9B59B6',
        fillColor: '#C3B1E1',
        fillOpacity: 0.2,
        radius: 3000
    }).addTo(map).bindPopup('<b>Area Layanan Gratis Ongkir</b><br>Radius 3km dari toko');
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        if (name && email && message) {
            Swal.fire({
                title: '💌 Pesan Terkirim!',
                text: `Terima kasih ${name}! Kami akan membalas segera.`,
                icon: 'success',
                confirmButtonColor: '#9B59B6'
            });
            form.reset();
        } else {
            Swal.fire({
                title: 'Oops!',
                text: 'Mohon isi semua field!',
                icon: 'error',
                confirmButtonColor: '#9B59B6'
            });
        }
    });
}

// ========== NEWSLETTER ==========
function initNewsletter() {
    const btn = document.getElementById('newsletterBtn');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        const email = document.getElementById('newsletterEmail').value;
        if (email && email.includes('@')) {
            Swal.fire({
                title: '📧 Berlangganan!',
                text: `Email ${email} terdaftar!`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            document.getElementById('newsletterEmail').value = '';
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Email tidak valid!',
                icon: 'error',
                confirmButtonColor: '#9B59B6'
            });
        }
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                const offcanvas = document.querySelector('.offcanvas.show');
                if (offcanvas) {
                    bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
                }
            }
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });
}

// ========== FLOATING HEARTS ==========
function initFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.cssText = `
            position: fixed;
            bottom: -20px;
            left: ${Math.random() * 100}%;
            color: #9B59B6;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: heartFloatUp ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 800);
}

// ========== INISIALISASI AOS ==========
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// ========== TAMBAHKAN CSS ANIMASI UNTUK HEART ==========
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(heartStyle);

// ========== EVENT LISTENERS ==========
document.getElementById('cartIcon')?.addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
});

document.getElementById('historyIcon')?.addEventListener('click', (e) => {
    e.preventDefault();
    showOrderHistory();
});

document.getElementById('heartIcon')?.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: '💝 Wishlist',
        text: 'Fitur wishlist akan segera hadir!',
        icon: 'info',
        confirmButtonColor: '#9B59B6'
    });
});

// ========== EXPOSE FUNCTIONS KE GLOBAL ==========
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.quickView = quickView;
window.showCart = showCart;
window.checkout = checkout;
window.trackOrder = trackOrder;
window.showTracking = showTracking;
window.showOrderHistory = showOrderHistory;

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadTestimonials();
    initContactForm();
    initNewsletter();
    initSmoothScroll();
    initNavbarScroll();
    initFloatingHearts();
    initAOS();
    initMap();
    updateCartCount();
    console.log('🌸 Bloomly Flower Shop Loaded! 🌸');
});
