/**
 * Register Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const snackbar = document.getElementById('snackbar');

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.className = "show";
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            showSnackbar("Passwords do not match");
            return;
        }

        const result = Auth.register(name, email, password);

        if (result.success) {
            alert("Registration successful! Please login.");
            window.location.href = 'login.html';
        } else {
            showSnackbar(result.message || "Registration failed");
        }
    });
});
