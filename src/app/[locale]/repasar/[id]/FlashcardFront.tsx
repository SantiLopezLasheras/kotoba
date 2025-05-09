interface FlashcardFrontProps {
  palabra: string;
  onToggleMostrar: () => void;
  mostrar: boolean;
}

export function FlashcardFront({
  palabra,
  onToggleMostrar,
  mostrar,
}: FlashcardFrontProps) {
  return (
    <div className="w-full sm:w-[500px] h-72 flex flex-col items-center justify-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        {palabra}
      </h2>
      <button
        onClick={onToggleMostrar}
        className="mt-4 px-4 py-2 bg-[var(--color-blue)] text-white rounded-md cursor-pointer hover:bg-[var(--color-blue)]/80 transition-all"
      >
        {mostrar ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
