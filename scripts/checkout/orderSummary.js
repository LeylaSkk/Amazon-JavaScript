import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption, getDeliveryOption } from "../../data/deliveryOptions.js";    
import { renderPaymentSummary } from "./paymentSummary.js";


/*we did use external libraries to use already an implemented code(best practice to avoid complicated code)
calculate delivery date:
1.get today's date : "var now=dayjs()"
2. do calculation (+7 days..)
3.display the date
dddd : the name of the day of the week (sunday)
MMMM: the full Month name (January)
D: the day of the month (1-31)
*/ 


export function renderOrderSummary(){

    /**we add this variable so each time we loop through the cart w e add this html and store it in */

    let cartSummaryHTML = '';
    cart.forEach((cartItem)=>{
        
        const productId =cartItem.productId;
        //here we looked for our matching product
        let matchingProduct = getProduct(productId);
        //so once we got our matching product we can retrieve from it its relative pic,price and name

        //get the delivery days preperly and caluculate the date we need at 52
        const deliveryOptionId= cartItem.deliveryOptionId;
        const selectedDeliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days'); // Uses the matched delivery option
        const dateString = deliveryDate.format('dddd, MMMM D');

        
        cartSummaryHTML +=
        
        /**  we took this html from checkout.html to display each container of each product chosen or added to the cart dynamically  */
        `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
                </div>
            </div>
        
        
        `;
        
    });
    /** 1.loop through deliveryOptions
     * 2.for each delivery Option generate some html 
     * 3.combine the html togther 
    */
    function deliveryOptionsHTML(matchingProduct,cartItem) {
        let html = '';

        deliveryOption.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 
                ? 'Free' 
                : `$${formatCurrency(deliveryOption.priceCents)} -`;
            /*in order to make one of the delivery options to be checked we create isChecked however if we insert checked into the radio button all of the options will be checked so we need to check the one that the  delivery option id matches the one  saved in the cart */
            const isChecked = deliveryOption.id  === cartItem.deliveryOptionId;//difference between == &===
            //we used delivery-option-${matchingProduct.id} to make each radio button name unique to each product 
            html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>`;
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    //how we will know which product to delete that why we need data-attibute to look at it with id 
    
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            //so now we got the element we want to delete from this interface 
            const productId =link.dataset.productId;
            removeFromCart(productId);
            /** next thing wee need to do after clicking delete is to update the html by using the DOM to get the element to remove then use .remove() method */
            const container= document.querySelector(` .js-cart-item-container-${productId}`
            );
            
            container.remove();
            // when we click deleted the prices of the deleted products gets removed 
            renderPaymentSummary();
        });
        
    });
    
    //when we change the deliveryOption
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const {productId, deliveryOptionId}= element.dataset;// how we get these two ? we add data attributes 
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();//to keep the page up to date an improvment for DOM
            //this will make the prices change each time we want to change the shipping method
            renderPaymentSummary();
        });
    });
}
//so we did regenrate html when updating delivery option by using MVC (model-view-controller)
/**MVC : split our code into 3 parts 
 * 1.Model= saves and manages data (this is our data section where we have cart,products...)
 * 2.view= takes data and displays on page  (we did this in orderSummary and paymentSummary)
 * 3.controller=runs some code when we interact with the page (eventListener part )
 */