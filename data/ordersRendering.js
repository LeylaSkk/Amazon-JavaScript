import { orders } from './orders.js';
import { formatCurrency } from '../utils/money.js';

export function renderOrders() {
    const ordersContainer = document.querySelector('.js-orders-grid');
    
    // Clear any existing content
    ordersContainer.innerHTML = '';

    // If no orders, show a message
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="no-orders">
                You haven't placed any orders yet.
            </div>
        `;
        return;
    }

    // Render each order
    orders.forEach(order => {
        // Create order container
        const orderContainer = document.createElement('div');
        orderContainer.classList.add('order-container');

        // Format the order date
        const orderDate = new Date(order.orderPlacedDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        });

        // Create order header HTML
        const orderHeaderHTML = `
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${formattedDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>
        `;

        // Create order details HTML
        let orderDetailsHTML = '<div class="order-details-grid">';
        
        order.products.forEach(product => {
            orderDetailsHTML += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${new Date(product.expectedDeliveryDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `;
        });

        orderDetailsHTML += '</div>';

        // Combine header and details
        orderContainer.innerHTML = orderHeaderHTML + orderDetailsHTML;

        // Add to orders container
        ordersContainer.appendChild(orderContainer);
    });
}

// Call the render function when the page loads
document.addEventListener('DOMContentLoaded', renderOrders);