class Cart {
    constructor() {
        this.cart = this.loadFromStorage();
    }

    // Load the cart from localStorage, or initialize with default values if not found
    loadFromStorage() {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            return savedCart;
        } else {
            return [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    // Save the cart to localStorage
    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Add a product to the cart
    addToCart(productId) {
        let matchingItem = this.cart.find(item => item.productId === productId);
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cart.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    // Remove a product from the cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.saveToStorage();
    }

    // Update the delivery option for a product
    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cart.find(item => item.productId === productId);
        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }

    // Get the current cart
    getCart() {
        return this.cart;
    }
}

// Usage

const cartInstance = new Cart();

// Example usage
cartInstance.addToCart('someProductId'); // Adds a product to the cart
cartInstance.removeFromCart('someProductId'); // Removes a product from the cart
cartInstance.updateDeliveryOption('someProductId', '2'); // Updates the delivery option

// Get the current cart
console.log(cartInstance.getCart());
