# ShopEasy - Online Shopping Website

A fully functional responsive web application for an online shopping site using Bootstrap 5, Material Design, and LocalStorage.

## Features

-   **User Authentication**: Registration and Login with validation.
-   **Product Management**: Admin can Add, Edit, and Delete products.
-   **Shopping Cart**: Add to cart, update quantities, remove items, and view total.
-   **Responsive Design**: Built with Bootstrap 5 and custom CSS for a modern look.
-   **Data Persistence**: All data (users, products, cart) is stored in the browser's LocalStorage.

## Pages

1.  **Home Page (`index.html`)**: Landing page with hero banner and featured categories.
2.  **Shop Page (`shop.html`)**: Displays all products in a grid layout. Admins see Edit/Delete buttons.
3.  **Cart Page (`cart.html`)**: Manage your shopping cart items.
4.  **Login (`login.html`)**: User login form.
5.  **Register (`register.html`)**: User registration form.
6.  **Add Product (`add-product.html`)**: Admin form to create new products.
7.  **Edit Product (`edit-product.html`)**: Admin form to update existing products.

## Technologies Used

-   **HTML5**: Structure.
-   **CSS3**: Styling with Custom Properties (Variables).
-   **Bootstrap 5**: Layout (Grid, Navbar) and Components (Cards, Forms).
-   **Material Design**: Icons and design principles (Shadows, Colors).
-   **JavaScript (ES6+)**: Logic for CRUD, Auth, and DOM manipulation.
-   **LocalStorage**: Client-side database.

## How to Run

1.  Clone or download the repository.
2.  Open `index.html` in your web browser.
3.  **Admin Login**:
    -   Email: `admin@gmail.com`
    -   Password: `admin123`
4.  **User Login**: Register a new account or use the admin account.

## CRUD Operations

-   **Create**: Register User, Add Product.
-   **Read**: View Products, View Cart, Login (Read User).
-   **Update**: Edit Product, Update Cart Quantity.
-   **Delete**: Delete Product, Remove from Cart.
