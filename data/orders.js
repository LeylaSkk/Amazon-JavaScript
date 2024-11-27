export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    savaToStorage();
}
function savaToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
