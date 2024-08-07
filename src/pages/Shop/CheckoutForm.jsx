import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function CheckoutForm({ price }) {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const user = useAuth();

  useEffect(() => {
    const description = "Purchase of goods"; // Add your transaction description here

    if (price < 0.5) {
      // Handle the case where the price is too low for a payment intent
      axios.post('http://localhost:3000/create-setup-intent')
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("Error creating setup intent:", error);
        });
    } else {
      axios.post('http://localhost:3000/create-payment-intent', { price, description })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!clientSecret) {
      toast.error("Payment client secret not available");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details not entered");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: user?.displayName || 'anonymous',
        email: user?.email,
        address: {
          line1: "1234 Market St",
          city: "San Francisco",
          state: "CA",
          postal_code: "94111",
          country: "US",
        },
      }
    });

    if (error) {
      toast.error(error.message);
      return;
    } else {
      if (price < 0.5) {
        const { setupIntent, error: setupError } = await stripe.confirmCardSetup(
          clientSecret, {
            payment_method: paymentMethod.id,
          }
        );

        if (setupError) {
          toast.error(setupError.message);
        } else {
          toast.success("Payment method saved");
        }
      } else {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret, {
            payment_method: paymentMethod.id,
          }
        );

        if (confirmError) {
          toast.error(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
          toast.success("Payment Successful");
        }
      }
    }
  };

  return (
    <div>
      <div className="py-32 px-8 flex flex-col items-center justify-between gap-8">
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug my-14 mx-14">
            <span className="text-yellow-500">Details </span>
          </h2>
          <div className="w-full flex gap-20">
            <div className="w-1/2 h-52 bg-yellow-500 flex flex-col justify-center items-center rounded-lg shadow-2xl">
              <div className="space-y-3">
                <h1 className="font-extrabold text-xl">Shopping Details</h1>
                <p className="font-bold">Total Price: ${price}</p>
              </div>
            </div>
            <div className="md:w-1/2 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 rounded-lg">
              <h4 className="text-lg font-semibold">Process your payment!</h4>
              <h5 className="font-medium">Credit/Debit Card</h5>
              <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                  className="w-full px-2 py-2 border border-gray-300 rounded"
                />
                <button type="submit" disabled={!stripe}
                  className="w-full bg-sky-500 text-white py-2 rounded-lg">
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CheckoutForm;
