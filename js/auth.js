/**
 * Authentication Service
 * Handles Login, Register, and Route Protection
 */

const Auth = {
    isAdmin: function () {
        const user = Storage.getCurrentUser();
        return user && user.email === 'admin@gmail.com';
    },

    isLoggedIn: function () {
        return !!Storage.getCurrentUser();
    },

    login: function (email, password) {
        // Admin hardcoded check
        if (email === 'admin@gmail.com' && password === 'admin123') {
            const adminUser = { id: 0, name: 'Admin', email: 'admin@gmail.com' };
            Storage.setCurrentUser(adminUser);
            return { success: true };
        }

        const user = Storage.findUserByEmail(email);
        if (user && user.password === password) {
            Storage.setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    },

    register: function (name, email, password) {
        if (Storage.findUserByEmail(email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = { name, email, password };
        Storage.saveUser(newUser);
        return { success: true };
    },

    logout: function () {
        Storage.logout();
        window.location.href = 'login.html';
    },

    checkAuth: function () {
        // List of pages that require login
        const protectedPages = ['cart.html', 'shop.html'];
        const adminPages = ['add-product.html', 'edit-product.html'];

        const path = window.location.pathname;
        const page = path.split("/").pop();

        if (!this.isLoggedIn() && (protectedPages.includes(page) || adminPages.includes(page))) {
            window.location.href = 'login.html';
            return;
        }

        if (this.isLoggedIn() && !this.isAdmin() && adminPages.includes(page)) {
            alert("Access Denied: Admins only");
            window.location.href = 'shop.html';
            return;
        }

        // Redirect logged in users away from login/register
        if (this.isLoggedIn() && (page === 'login.html' || page === 'register.html')) {
            window.location.href = 'index.html';
        }
    }
};

// Run check on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.checkAuth();
});
