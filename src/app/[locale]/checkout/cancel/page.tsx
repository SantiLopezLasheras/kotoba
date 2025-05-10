"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CanceledPage() {
  const t = useTranslations("Stripe");

  return (
    <div className="text-center py-12">
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="mx-auto mb-8"
        width={150}
        height={150}
      />
      <h2 className="text-2xl font-semibold">{t("paymentCanceledTitle")}</h2>
      <p className="mt-4">{t("paymentCanceledMessage")}</p>
      <Link href="/checkout">
        <button className="mt-4 py-2 px-4 bg-[var(--color-accent)] text-white font-semibold rounded border border-[var(--color-accent)] hover:opacity-90 transition">
          {t("tryAgain")}
        </button>
      </Link>
    </div>
  );
}
