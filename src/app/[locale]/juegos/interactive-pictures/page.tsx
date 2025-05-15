import InteractivePicture from "./InteractivePicture";
import TopicSelector from "./TopicSelector";

interface InteractivePageProps {
  searchParams: Promise<{ topic?: string }>;
}
export default async function InteractivePicturesPage({
  searchParams,
}: InteractivePageProps) {
  const { topic } = await searchParams;
  const theme = topic || "home";

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)]  text-center relative">
      <div className="absolute top-4 right-4">
        <TopicSelector />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <InteractivePicture initialTheme={theme} />
      </div>
    </div>
  );
}
