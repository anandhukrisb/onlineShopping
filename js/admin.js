/**
 * Admin Page Logic (Add/Edit Product)
 */

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const editProductForm = document.getElementById('editProductForm');
    const snackbar = document.getElementById('snackbar');

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.className = "show";
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }

    // --- Add Product Logic ---
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const price = parseFloat(document.getElementById('price').value);
            const description = document.getElementById('description').value.trim();
            const imagename = document.getElementById('imagename').value.trim();

            const newProduct = { name, price, description, imagename };
            Storage.saveProduct(newProduct);

            alert('Product added successfully!');
            window.location.href = 'shop.html';
        });
    }

    // --- Edit Product Logic ---
    if (editProductForm) {
        // Get ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            alert('No product specified');
            window.location.href = 'shop.html';
            return;
        }

        const product = Storage.getProductById(id);
        if (!product) {
            alert('Product not found');
            window.location.href = 'shop.html';
            return;
        }

        // Fill form
        document.getElementById('productId').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('description').value = product.description;
        document.getElementById('imagename').value = product.imagename;

        editProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedProduct = {
                id: document.getElementById('productId').value,
                name: document.getElementById('name').value.trim(),
                price: parseFloat(document.getElementById('price').value),
                description: document.getElementById('description').value.trim(),
                imagename: document.getElementById('imagename').value.trim()
            };

            if (Storage.updateProduct(updatedProduct)) {
                alert('Product updated successfully!');
                window.location.href = 'shop.html';
            } else {
                showSnackbar('Failed to update product');
            }
        });
    }
});
