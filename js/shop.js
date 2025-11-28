/**
 * Shop Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const snackbar = document.getElementById('snackbar');
    const isAdmin = Auth.isAdmin();

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.className = "show";
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }

    function renderProducts() {
        const products = Storage.getProducts();
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            productsGrid.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No products available.</p></div>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-lg-3';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${product.imagename}" class="card-img-top" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted small flex-grow-1">${product.description}</p>
                        <h6 class="card-subtitle mb-3 text-primary fw-bold">$${parseFloat(product.price).toFixed(2)}</h6>
                        
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                                <span class="material-icons align-middle fs-6 me-1">add_shopping_cart</span> Add to Cart
                            </button>
                            ${isAdmin ? `
                            <div class="d-flex gap-2 justify-content-center mt-2">
                                <a href="edit-product.html?id=${product.id}" class="btn btn-outline-secondary btn-sm flex-grow-1">Edit</a>
                                <button class="btn btn-outline-danger btn-sm flex-grow-1 delete-product" data-id="${product.id}">Delete</button>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        // Attach event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                const product = Storage.getProductById(id);
                Storage.addToCart(product);
                showSnackbar(`${product.name} added to cart!`);
                // Refresh navbar to update cart count
                document.querySelector('nav').remove();
                renderNavbar();
            });
        });

        if (isAdmin) {
            document.querySelectorAll('.delete-product').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (confirm('Are you sure you want to delete this product?')) {
                        const id = e.target.closest('button').dataset.id;
                        Storage.deleteProduct(id);
                        renderProducts();
                        showSnackbar('Product deleted');
                    }
                });
            });
        }
    }

    renderProducts();
});
