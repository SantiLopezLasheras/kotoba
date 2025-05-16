import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";

export async function checkPremiumRole() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return false;
  }

  const userDB = await getUserByEmail(user.email);

  if (!userDB) {
    return false;
  }

  if (userDB.role === "premium") {
    return true;
  }

  return false;
}
