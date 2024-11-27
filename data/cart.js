export let cart =JSON.parse( localStorage.getItem('cart'));
/*this will give us a string so wee need to convert it back to an array by JSON.parse
if we don't have cart saved localstorage will give us null  so if its null we give it a default value the one down bellow*/
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
//whenever we update the cart we need to save it to local storafge so it wont get reset when we refresh the page 
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
}

//this is how we remove a product from cart
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
