import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-bgSecondary text-textPrimary py-10 mt-16 border-t border-inactive">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} KOTOBA. {t("copyright")}
          </p>
        </div>

        <nav className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-center md:text-left">
          <Link href="/legal/aviso-legal" className="hover:text-accent">
            {t("legalNotice")}
          </Link>
          <Link href="/legal/politica-cookies" className="hover:text-accent">
            {t("cookiePolicy")}
          </Link>
          <Link href="/legal/politica-privacidad" className="hover:text-accent">
            {t("privacyPolicy")}
          </Link>
        </nav>

        <div>
          <Image
            src="/images/nextgeneration.jpg"
            alt="Next Generation EU"
            width={160}
            height={60}
            className="object-contain"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      </div>
    </footer>
  );
}
