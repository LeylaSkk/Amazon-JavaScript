import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from "../../data/deliveryOptions.js";    

hello();

/*we did use external libraries to use already an implemented code(best practice to avoid complicated code)
calculate delivery date:
1.get today's date : "var now=dayjs()"
2. do calculation (+7 days..)
3.display the date
dddd : the name of the day of the week (sunday)
MMMM: the full Month name (January)
D: the day of the month (1-31)
*/ 
const today= dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){



    let cartSummaryHTML = '';
    cart.forEach((cartItem)=>{
        //look for product from products list by its id then to retrieve its relative image...
        const productId =cartItem.productId;

        let matchingProduct;
        products.forEach((product)=>{
            if(product.id===productId){
                matchingProduct=product;
                
            }

        });

        //get the delivery days preperly and caluculate the date we need at 52
        const deliveryOptionId= cartItem.deliveryOptionId;
        let selectedDeliveryOption;
        deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionId) {
            selectedDeliveryOption = option; // Fixed typo and correct variable assignment
        }
    });


        const today = dayjs();
        const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days'); // Uses the matched delivery option
        const dateString = deliveryDate.format('dddd, MMMM D');

        
        cartSummaryHTML +=
        //we added this in order to delete it and when refresh the page it will be gone
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
                    <span class="update-quantity-link link-primary">
                        Update
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

    function deliveryOptionsHTML(matchingProduct,cartItem) {
        let html = '';

        deliveryOption.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 
                ? 'Free' 
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

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
            const productId =link.dataset.productId;
            removeFromCart(productId);
            const container= document.querySelector(` .js-cart-item-container-${productId}`

            );
            //so now we got the element we want to delete from this interface 
            container.remove();
        });
        //now how actually we will be removing this product (productID) from the cart 
    });
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const {productId, deliveryOptionId}= element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
        });
    });
}