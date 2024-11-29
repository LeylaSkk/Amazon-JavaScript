export let cart =JSON.parse( localStorage.getItem('cart'));
/* we need to get the cart frm local strage since we already saved it we need to rememeber that local storage will give us a cart in a string format so in order to manipulate and transform it bach into an array we need to parse it 
if we don't have cart saved in localstorage  we give it a default value the one down below*/

/**5. if we see here we re saving the productid, quantity and deliveryoptionid not actuallt the proucts image name and price well because we re saving this id then we can use the id to search for this product inside of the product array already existing in the products.js by using the function already implemented getProduct  so this technique is known by " deduplicating the data or normalizing the daya " */
if (!cart){
    cart=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
    },
    {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
    }];
}


//whenevr we add how many products we want when we go check our basket it wont change back to the intial products and forget the ones we just selected 
function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
};
//each time  we update the cart we need to save it to local storage so it wont get reset when we refresh the page 

/** 2. so this function what it does is to first check if the product is already in the cart if it is
 we increase the quantity else we  do add this product by using push 
 */
export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
     if (productId === cartItem.productId){
     matchingItem = cartItem;
     }
    });
    //to make quantity=2 f we have matching item 
    if (matchingItem) {
     matchingItem.quantity += 1;
    }else{
     cart.push({
         productId: productId,
         quantity: 1,
         deliveryOptionId:'1'
        });
    }
    saveToStorage();
    //whenever we update the cart we need to save it into local storage so when we refresh the page it wont reset
}

/** this is how we remove a product from cart
 *1. create new array 
 2.loop through the cart 
 3. add each product to the new array except for this productId
*/
export function removeFromCart(productId){
    const newCart =[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart= newCart;
    saveToStorage();
}

//we created this  so each time we select a new delivery option website display its attributes  ( first we need to know theproduct we wanna update and the delivery option)
 export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
     if (productId === cartItem.productId){
     matchingItem = cartItem;
     }
    });
    //this will give us the cart item that matches this producid andsave it to this variable

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
 }
 //but in order ty add these changes in our web page we need to apply DOM for our html 