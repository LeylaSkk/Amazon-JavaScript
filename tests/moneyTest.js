import {formatCurrency} from "../scripts/utils/money.js";
if (formatCurrency(2095)=== '20.95'){
    console.log('passed');
}else {
    console.log('failed');
}
//this is how to run an automated test 
if (formatCurrency(0)==='0.00'){
    console.log('passed');
}else {
    console.log('failed');
}