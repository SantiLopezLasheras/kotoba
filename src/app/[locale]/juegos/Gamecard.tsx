import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  label: string;
};

export default function GameCard({
  title,
  description,
  image,
  href,
  label,
}: GameCardProps) {
  return (
    <div className="w-80 h-96 bg-white dark:bg-[var(--color-bgSecondary)] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className="flex flex-col justify-between p-5 h-full text-gray-800 dark:text-white">
        <div className="min-h-[60px] flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-[var(--color-accent)] text-center leading-tight mb-2">
            {title}
          </h2>
        </div>

        <p className="text-center mb-4 text-sm flex-1">{description}</p>

        <div className="mt-auto flex justify-center">
          <Link
            href={href}
            className="text-[var(--color-blue)] font-bold hover:underline"
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
}
