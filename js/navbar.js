/**
 * Navbar Component
 * Renders the navigation bar dynamically
 */

function renderNavbar() {
    const user = Storage.getCurrentUser();
    const isAdmin = Auth.isAdmin();
    const cartCount = Storage.getCart().reduce((acc, item) => acc + item.quantity, 0);

    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="index.html">
                <span class="material-icons me-2">shopping_bag</span>
                ShopEasy
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="shop.html">Shop</a>
                    </li>
                    ${isAdmin ? `
                    <li class="nav-item">
                        <a class="nav-link" href="add-product.html">Add Product</a>
                    </li>
                    ` : ''}
                    <li class="nav-item">
                        <a class="nav-link position-relative" href="cart.html">
                            <span class="material-icons">shopping_cart</span>
                            ${cartCount > 0 ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.6rem;">${cartCount}</span>` : ''}
                        </a>
                    </li>
                    ${user ? `
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                            ${user.name}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#" onclick="Auth.logout()">Logout</a></li>
                        </ul>
                    </li>
                    ` : `
                    <li class="nav-item">
                        <a class="nav-link btn btn-outline-light ms-2 px-3" href="login.html">Login</a>
                    </li>
                    `}
                </ul>
            </div>
        </div>
    </nav>
    `;

    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait for DOM to be ready
    renderNavbar();
});
