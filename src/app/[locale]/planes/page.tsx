import React from "react";
import Link from "next/link";

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] py-16 px-4 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Elige tu plan</h1>
        <p className="text-lg">
          Empieza gratis y mejora tu aprendizaje con el plan premium.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* PLAN GRATUITO */}
        <div className="border rounded-xl p-8 bg-[var(--color-bgSecondary)] shadow-md">
          <h2 className="text-2xl font-bold mb-4">Plan Gratuito</h2>
          <p className="text-4xl font-semibold text-[var(--color-accent)] mb-6">
            0€
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li>✅ Accede a listas de vocabulario</li>
            <li>✅ Repasa las tarjetas de vocabulario</li>
          </ul>
        </div>

        {/* PLAN PREMIUM */}
        <div className="border rounded-xl p-8 bg-[var(--color-bgSecondary)] shadow-md">
          <h2 className="text-2xl font-bold mb-4">Plan Premium</h2>
          <p className="text-4xl font-semibold text-[var(--color-accent)] mb-6">
            4,99€/mes
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li>🚀 Crea tus propias listas y flashcards</li>
            <li>⏳ Repasa con repeticiones espaciadas</li>
            <li>🎮 Minijuegos para aprender</li>
            <li>📚 Lecciones y gramática</li>
            <li>🖨️ Imprime tus flashcards</li>
            <li>📊 Estadísticas de tus progresos</li>
          </ul>
          <div className="mt-4">
            <Link href="/checkout">
              <button className="w-full cursor-pointer py-2 px-4 bg-[var(--color-accent)] text-white font-semibold rounded border border-[var(--color-accent)] hover:opacity-90 transition">
                Suscríbete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
