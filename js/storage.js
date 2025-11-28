/**
 * Storage Manager for Online Shopping App
 * Handles all interactions with LocalStorage
 */

const Storage = {
    // Keys
    KEYS: {
        USERS: 'shopping_users',
        PRODUCTS: 'shopping_products',
        CART: 'shopping_cart',
        CURRENT_USER: 'shopping_current_user'
    },

    // --- User Management ---
    getUsers: function() {
        return JSON.parse(localStorage.getItem(this.KEYS.USERS) || '[]');
    },

    saveUser: function(user) {
        const users = this.getUsers();
        // Assign ID
        user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        return user;
    },

    findUserByEmail: function(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    },

    // --- Auth Management ---
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem(this.KEYS.CURRENT_USER));
    },

    setCurrentUser: function(user) {
        // Don't store password in session
        const { password, ...safeUser } = user;
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(safeUser));
    },

    logout: function() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    },

    // --- Product Management ---
    getProducts: function() {
        return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS) || '[]');
    },

    saveProduct: function(product) {
        const products = this.getProducts();
        product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push(product);
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
        return product;
    },

    updateProduct: function(updatedProduct) {
        let products = this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(updatedProduct.id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
            return true;
        }
        return false;
    },

    deleteProduct: function(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
    },

    getProductById: function(id) {
        const products = this.getProducts();
        return products.find(p => p.id === parseInt(id));
    },

    // --- Cart Management ---
    getCart: function() {
        return JSON.parse(localStorage.getItem(this.KEYS.CART) || '[]');
    },

    addToCart: function(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
    },

    updateCartQuantity: function(productId, quantity) {
        let cart = this.getCart();
        const item = cart.find(item => item.id === parseInt(productId));
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
        }
    },

    removeFromCart: function(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== parseInt(productId));
        localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
    },

    clearCart: function() {
        localStorage.removeItem(this.KEYS.CART);
    },
    
    // Initialize with some dummy data if empty
    init: function() {
        if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
            const dummyProducts = [
                { id: 1, name: "Wireless Headphones", price: 99.99, description: "High quality noise cancelling headphones.", imagename: "https://via.placeholder.com/300?text=Headphones" },
                { id: 2, name: "Smart Watch", price: 199.50, description: "Track your fitness and notifications.", imagename: "https://via.placeholder.com/300?text=SmartWatch" },
                { id: 3, name: "Running Shoes", price: 79.00, description: "Comfortable shoes for daily running.", imagename: "https://via.placeholder.com/300?text=Shoes" },
                { id: 4, name: "Laptop Backpack", price: 45.00, description: "Water resistant backpack with laptop compartment.", imagename: "https://via.placeholder.com/300?text=Backpack" }
            ];
            localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(dummyProducts));
        }
    }
};

// Initialize on load
Storage.init();
