// Data Arrays

const categories = [
    { 
        id: 'gifts', 
        name: 'Premium Gifts', 
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        id: 'printing', 
        name: 'Custom Printing', 
        image: 'https://images.unsplash.com/photo-1562925562-1815db9768cd?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        id: 'showpieces', 
        name: 'Show Pieces', 
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        id: 'kurties', 
        name: 'Elegant Kurties', 
        image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=800&auto=format&fit=crop' 
    }
];

const products = [
    { 
        id: 1, 
        category: 'gifts', 
        name: 'Elegant Watch Box', 
        tag: 'Premium Quality', 
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 2, 
        category: 'gifts', 
        name: 'Luxury Perfume Set', 
        tag: 'Best Seller', 
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 3, 
        category: 'printing', 
        name: 'Corporate Mugs', 
        tag: 'Bulk Deals', 
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 4, 
        category: 'printing', 
        name: 'Custom T-Shirts', 
        tag: 'Your Design', 
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 5, 
        category: 'showpieces', 
        name: 'Abstract Sculpture', 
        tag: 'Handcrafted', 
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 6, 
        category: 'showpieces', 
        name: 'Vintage Brass Vase', 
        tag: 'Antique', 
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 7, 
        category: 'kurties', 
        name: 'Embroidered Cotton Kurti', 
        tag: 'Comfort Wear', 
        image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=600&auto=format&fit=crop' 
    },
    { 
        id: 8, 
        category: 'kurties', 
        name: 'Silk Party Wear', 
        tag: 'Festive Ready', 
        image: 'https://images.unsplash.com/photo-1583391733958-66a9d2c676af?q=80&w=600&auto=format&fit=crop' 
    }
];

// DOM Elements
const categoryContainer = document.getElementById('category-container');
const productContainer = document.getElementById('product-container');
const filterControls = document.getElementById('filter-controls');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

// Initialize Layout
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts('all');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
    });
});

// Render Categories
function renderCategories() {
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.classList.add('category-card');
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" loading="lazy">
            <div class="category-overlay">
                <h3>${cat.name}</h3>
            </div>
        `;
        // Scroll to products and filter when clicking a category
        card.addEventListener('click', () => {
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${cat.id}"]`);
            if (filterBtn) filterBtn.click();
            document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
        });
        categoryContainer.appendChild(card);
    });
}

// Render Products
function renderProducts(filterStr) {
    productContainer.innerHTML = '';
    
    let filteredProducts = products;
    if (filterStr !== 'all') {
        filteredProducts = products.filter(p => p.category === filterStr);
    }
    
    filteredProducts.forEach((prod, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${prod.image}" alt="${prod.name}" loading="lazy">
                <span class="product-tag">${prod.tag}</span>
            </div>
            <div class="product-info">
                <h3>${prod.name}</h3>
                <p>Catalog Item - Inquire for Details</p>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// Filter Functionality
if (filterControls) {
    const buttons = filterControls.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            buttons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            // Render specific products
            const filterValue = e.target.getAttribute('data-filter');
            renderProducts(filterValue);
        });
    });
}
