/**
 * Login Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const snackbar = document.getElementById('snackbar');

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.className = "show";
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showSnackbar("Please fill in all fields");
            return;
        }

        const result = Auth.login(email, password);

        if (result.success) {
            window.location.href = 'index.html';
        } else {
            showSnackbar(result.message || "Invalid credentials");
        }
    });
});
