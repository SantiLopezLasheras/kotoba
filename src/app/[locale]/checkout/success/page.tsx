"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface StripeSession {
  customerEmail: string;
  paymentStatus: string;
}

export default function SuccessPage() {
  const t = useTranslations("Stripe");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<StripeSession | null>(
    null
  );

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/create-checkout-session?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          setSessionDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al recuperar la sesión de Stripe:", error);
          setLoading(false);
        });
    }
  }, [sessionId]);

  console.log("Estado del Pago: ", sessionDetails?.paymentStatus);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

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

  return (
    <div className="text-center py-12">
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="mx-auto mb-8"
        width={150}
        height={150}
      />
      <h2 className="text-2xl font-semibold">{t("paymentSuccessTitle")}</h2>
      <p className="mt-4">{t("paymentSuccessMessage")}</p>
      <p>{t("redirecting")}</p>
    </div>
  );
}
