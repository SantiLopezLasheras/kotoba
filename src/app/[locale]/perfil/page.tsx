import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getRandomAvatar } from "@/utils/getRandomAvatar";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const avatarUrl = getRandomAvatar();
  const t = await getTranslations("Profile");

  if (!user) {
    return redirect("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-bgPrimary py-10 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-accent">
          <Image
            src={avatarUrl}
            alt={user?.given_name ?? "Profile picture"}
            fill
            className="object-cover"
            sizes="96px"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {user.given_name ?? t("noName")}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-1">
          {t("email")}: <span className="font-medium">{user.email}</span>
        </p>

        <div className="mt-6">
          <Link
            href="#"
            className="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition"
          >
            {t("manageAccount")}
          </Link>
        </div>
      </div>
    </main>
  );
}
