export function formatCurrency(priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;
//each file can only have one default export we can choose the version