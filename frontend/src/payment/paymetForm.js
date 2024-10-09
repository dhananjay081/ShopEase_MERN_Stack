import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Payment from "../component/Cart/Payment"; // Adjust the import according to your project structure

const PaymentForm = () => { // Change function name to PaymentForm
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching the key
  }

  const stripePromise = loadStripe(stripeApiKey);

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentForm; // Export PaymentForm
