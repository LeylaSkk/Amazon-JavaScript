import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/backend-practice.js'

/**we have two sections in the checkout.html interface one for order summary and the other for payment summary so we have decided to split it into two different java script files then run each in this checkout.js*/
renderOrderSummary();
renderPaymentSummary();