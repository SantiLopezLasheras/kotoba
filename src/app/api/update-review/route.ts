import { NextRequest, NextResponse } from "next/server";
import { updateFlashcardReview } from "@/lib/dbqueries/updateFlashcardReview";

export async function POST(req: NextRequest) {
  try {
    const { flashcardId, currentFrequency, difficulty } = await req.json();

    if (!flashcardId || currentFrequency === undefined) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    await updateFlashcardReview(flashcardId, currentFrequency, difficulty);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
