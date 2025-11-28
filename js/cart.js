/**
 * Cart Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    function renderCart() {
        const cart = Storage.getCart();
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center py-5 text-muted">Your cart is empty</td></tr>';
            subtotalEl.textContent = '$0.00';
            totalEl.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4">
                    <div class="d-flex align-items-center">
                        <img src="${item.imagename}" alt="${item.name}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/50'">
                        <div>
                            <h6 class="mb-0">${item.name}</h6>
                        </div>
                    </div>
                </td>
                <td>$${parseFloat(item.price).toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control form-control-sm quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" style="width: 70px;">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td class="text-end pe-4">
                    <button class="btn btn-outline-danger btn-sm remove-item" data-id="${item.id}">
                        <span class="material-icons fs-6">delete</span>
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        subtotalEl.textContent = `$${total.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;

        // Attach event listeners
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const qty = e.target.value;
                Storage.updateCartQuantity(id, qty);
                renderCart();
                updateNavbar();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                Storage.removeFromCart(id);
                renderCart();
                updateNavbar();
            });
        });
    }

    function updateNavbar() {
        document.querySelector('nav').remove();
        renderNavbar();
    }

    renderCart();
});
