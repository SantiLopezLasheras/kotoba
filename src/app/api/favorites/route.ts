import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { addFavorite } from "@/lib/dbqueries/addFavorite";
import { deleteFavorite } from "@/lib/dbqueries/deleteFavorite";
import { comprobarFavoritos } from "@/lib/dbqueries/comprobarFavorito";

export async function POST(req: NextRequest) {
  const { flashcardId } = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      { error: "No se pudo obtener el usuario desde Kinde" },
      { status: 401 }
    );
  }

  // Recupera al usuario de la base de datos
  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { error: "Usuario no encontrado en la base de datos" },
      { status: 404 }
    );
  }

  const userId = dbUser.id;

  if (!flashcardId) {
    return NextResponse.json(
      { error: "flashcardId es necesario" },
      { status: 400 }
    );
  }

  try {
    await addFavorite({ userId, flashcardId });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    return NextResponse.json(
      { error: "No se pudo añadir a favoritos" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const flashcardId = Number(searchParams.get("flashcardId"));

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      { error: "No se pudo obtener el usuario desde Kinde" },
      { status: 401 }
    );
  }

  // Recupera al usuario de la base de datos
  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { error: "Usuario no encontrado en la base de datos" },
      { status: 404 }
    );
  }

  const userId = dbUser.id;

  if (!flashcardId) {
    return NextResponse.json(
      { error: "flashcardId es necesario" },
      { status: 400 }
    );
  }

  try {
    const liked = await comprobarFavoritos(userId, flashcardId);
    return NextResponse.json({ liked }, { status: 200 });
  } catch (error) {
    console.error("Error al comprobar los favoritos:", error);
    return NextResponse.json(
      { error: "No se pudo comprobar los favoritos" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const flashcardId = Number(searchParams.get("flashcardId"));

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      { error: "No se pudo obtener el usuario desde Kinde" },
      { status: 401 }
    );
  }

  // Recupera al usuario de la base de datos
  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { error: "Usuario no encontrado en la base de datos" },
      { status: 404 }
    );
  }

  const userId = dbUser.id;

  if (!flashcardId) {
    return NextResponse.json(
      { error: "flashcardId es necesario" },
      { status: 400 }
    );
  }

  try {
    await deleteFavorite(userId, flashcardId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al quitar de favoritos:", error);
    return NextResponse.json(
      { error: "No se ha podido eliminar de favoritos" },
      { status: 500 }
    );
  }
}
