"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function getLocaleFromPath(pathname: string) {
  const parts = pathname.split("/");
  return parts[1];
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  useEffect(() => {
    // Function to handle the checkout session creation and redirection
    const createCheckoutSession = async () => {
      try {
        // Make a request to your backend to create a Stripe session
        const res = await fetch(`/api/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locale }),
        });

        const { url } = await res.json();

        if (url) {
          // Redirect the user to the Stripe Checkout page
          window.location.href = url;
        } else {
          throw new Error("Failed to create checkout session");
        }
      } catch (error) {
        console.log("Ha habido un error: " + error);
        setError(
          "There was an error processing your request. Please try again."
        );
        setLoading(false);
      }
    };

    // Trigger the checkout session creation when the page loads
    createCheckoutSession();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold">Redirecting to checkout...</h2>
        <p className="mt-2 text-gray-500">
          Please wait while we prepare your payment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold">Redirigiendo...</h2>
      <p className="mt-4">Por favor, espera mientras se prepara el pago.</p>
    </div>
  );
}
