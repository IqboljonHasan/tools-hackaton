"use client"
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubmitTool = () => {
  const [toolUrl, setToolUrl] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolUrl, email }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Tool</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>
            Tool URL:
            <input
              type="url"
              value={toolUrl}
              onChange={(e) => setToolUrl(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit and Pay
        </button>
      </form>
    </div>
  );
};

export default SubmitTool;
