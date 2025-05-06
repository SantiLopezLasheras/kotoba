import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  // recupera el usuario de Kinde
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return redirect("/");
  }

  // recupera el usuario de la base de datos
  const userDB = await getUserByEmail(user.email);

  // redirige al inicio si no existe el usuario, no tiene rol, o el rol no es admin
  if (!userDB?.role || userDB.role !== "admin") {
    return redirect("/");
  }

  // devuelve el userDB
  return userDB;
}
