import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){

    /*1.loop through the cart 
    2.for each product price*quantity
    3.add everything together*/
     /* cost of shipping 
    1.loop through the cart 
    2.add all the shipping costs together */
    let productPriceCents = 0;
    let shippingPriceCents=0;

    cart.forEach((cartItem)=>{
        const product  = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity; /**we did calculate the pri for each product in cart */ 

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        shippingPriceCents +=deliveryOption.priceCents;
       
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
    
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
    //creates an order from the backend and save it to local storage
    // This function is triggered when the "Place Order" button  is clicked.
    document.querySelector('.js-place-order').addEventListener('click', async ()=>{
        try{
            // Sends a POST request to the backend to create a new order.
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method:'POST', // Specifies the HTTP method as POST for creating a resource.
                headers: {
                'Content-Type':'application/json' // Indicates that the request body is in JSON format.
                },
                body:JSON.stringify({  // Sends the current cart's contents as the request payload.
                cart: cart
                })
                });
                // Waits for the server's response and parses it into JSON format.
                const order = await response.json();
                // Call the addOrder function to save the newly created order locally.
                addOrder(order);
        }catch(error){
            // If something goes wrong during the fetch, an error message is logged to the console.
            console.log('unexpected error , try again ');
        }

        window.location.href= 'orders.html';
       
    //Es6+
        });

}
//localStorage.getItem('orders')