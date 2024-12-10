import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
            <select class="quantity-select js-quantity-select-${product.id}">
                ${[...Array(10)].map((_, i) => `
                    <option value="${i + 1}" ${i === 0 ? 'selected' : ''}>
                        ${i + 1}
                    </option>
                `).join('')}
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Initial cart quantity update
updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        // Get the selected quantity from the dropdown
        const quantitySelect = document.querySelector(`.js-quantity-select-${productId}`);
        const quantity = Number(quantitySelect.value);

        // Add to cart with the selected quantity
        addToCart(productId, quantity);
        updateCartQuantity();
    });
});