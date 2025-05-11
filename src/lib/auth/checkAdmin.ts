import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";

export async function checkAdminRole() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return false;
  }

  const userDB = await getUserByEmail(user.email);

  if (!userDB?.role || userDB.role !== "admin") {
    return false;
  }

  return true;
}
