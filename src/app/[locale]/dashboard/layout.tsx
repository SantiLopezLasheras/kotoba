import Link from "next/link";
import { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-bgPrimary">
      {/* Barra Lateral */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6 text-accent">Dashboard</h2>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link href="/dashboard" className="hover:underline">
            General
          </Link>
          <Link href="/dashboard/newsletter" className="hover:underline">
            Newsletter
          </Link>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 flex justify-center items-start">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
