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
  if (loading) {
    return <div>{t("loading")}</div>;
  }

  // Datos del cliente
  const customerEmail = sessionDetails?.customerEmail;

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

      {/* Display user information if available */}
      <div className="mt-8">
        <p>
          <strong>{t("customerEmail")}: </strong>
          {customerEmail}
        </p>
      </div>
    </div>
  );
}
