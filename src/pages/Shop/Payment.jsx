import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Usecart from "../../hooks/Usecart";

const stripePromise = loadStripe(
  "pk_test_51PagEySCLk0NHLSaZzLduayEOueKAR2unemzLIGYMJhLo8dIEd4fDYsYMaY8nlI23xhHflUhRvMPe3UI39Fu26WJ006YAAkS4k"
);
console.log(stripePromise);
function Payment() {

  const [cart, refetch] = Usecart();

  const CartTotal = cart.reduce((total, item) => {
    return total + calculate(item);
  }, 0);
  const Total = CartTotal.toFixed(2);

  function calculate(item) {
    return item.price * item.quantity;
  }
  console.log(Total);
  return (
    <div >
      <Elements stripe={stripePromise}>
        <CheckoutForm price={Total}/>
      </Elements>
    </div>
  );
}

export default Payment;
