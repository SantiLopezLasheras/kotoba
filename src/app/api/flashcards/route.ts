import { NextResponse } from "next/server";
import { createFlashcard } from "@/lib/dbqueries/createFlashcard";
import { updateFlashcard } from "@/lib/dbqueries/updateFlashcard";
import { deleteFlashcard } from "@/lib/dbqueries/deleteFlashcard";

export async function POST(req: Request) {
  const {
    listaId,
    palabra,
    traduccion,
    fraseEjemplo,
    categoriaGramatical,
    notas,
    pronunciacion,
    image,
  } = await req.json();

  try {
    const newFlashcard = await createFlashcard({
      listaId,
      palabra,
      traduccion,
      fraseEjemplo,
      categoriaGramatical,
      notas,
      pronunciacion,
      image,
    });

    return NextResponse.json(newFlashcard, { status: 201 });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const {
    id,
    palabra,
    traduccion,
    fraseEjemplo,
    categoriaGramatical,
    notas,
    pronunciacion,
    image,
    listaId,
  } = await req.json();

  try {
    const updatedFlashcard = await updateFlashcard(id, {
      palabra,
      traduccion,
      fraseEjemplo,
      categoriaGramatical,
      notas,
      pronunciacion,
      image,
      listaId,
    });

    return NextResponse.json(updatedFlashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    await deleteFlashcard(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
