import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML= '';

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
            $${formatCurrency(product.priceCents )}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
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

console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML = productsHTML;

/** 3. to calculate the whole quantity of the product first we need to loop through the cart array 
 we initialised the cartQuantity to 0 and as we loop through this array cartItem  we re going to 
 add the items quantity to the variable we already initialized 
 */
// we didnt put this function into cart bcs it actually handles updating the webpage rather than the cart
function updateCartQuantity(){
    //calculate total quantity displayed in the cart
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity +=cartItem.quantity;
});

/** 4. so here after we calculated the quantity of products purchased we need to update the display of quantity on the top right icon of our web page by using DOM 'Document Object Model' we can also search 
  js-cart-quantity in the amazon.html
*/

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
/** 1. so this what it does to make plcae order button dynamic so we added an class attribute 
  js-add-to-cart and we created an event listener each time we click on the button (there s also a problem abt which product to add to cart actually so we added data attribute data- and it allows us to add any info to an element  so we use this command to allow us check our producId we notice that the annotation of product-id have changed from kebab case into camel case productId) then after adding a product we update the cart quantity * 
 */
//add product when clicking on add
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=> {
    button.addEventListener('click',()=>{
       const productId= button.dataset.productId;
       addToCart(productId);
       updateCartQuantity();
          
    });
});

/**/