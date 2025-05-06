import { requireAdmin } from "@/lib/auth/requireAdmin";

export default async function Dashboard() {
  const user = await requireAdmin();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Hello, {user.role} with email: {user.email}!
      </h1>
    </main>
  );
}
