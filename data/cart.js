export const cart = [];

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
         quantity: 1
        });
    }
}
