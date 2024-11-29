//here we saved the delivery options seperately and assigned an id to each type
export const deliveryOption = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0

},{
    id:'2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents:999
}];


//function takes the deliveryOptionId and find its delivery option from this array
export function getDeliveryOption(deliveryOptionId){
    let selectedDeliveryOption;
    deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
        selectedDeliveryOption = option; 
    }
});
return selectedDeliveryOption || deliveryOption[0];
}