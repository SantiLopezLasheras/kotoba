import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { getListaById } from "@/lib/dbqueries/getListaById";
import { createLista } from "@/lib/dbqueries/createLista";
import { updateLista } from "@/lib/dbqueries/updateLista";
import { deleteLista } from "@/lib/dbqueries/deleteLista";

export async function POST(req: NextRequest) {
  const { nombre, idioma, nivel } = await req.json();

  if (!nombre || !idioma || !nivel) {
    return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
  }

  // recuperar la sesión del usuario de Kinde
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "No se pudo obtener el usuario desde Kinde" },
      { status: 401 }
    );
  }

  // recuperar el usuario de la base de datos
  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { message: "Usuario no encontrado en la base de datos" },
      { status: 404 }
    );
  }

  const userId = dbUser.id;

  try {
    const newLista = await createLista({ nombre, idioma, nivel, userId });
    return NextResponse.json({ message: "Lista creada", lista: newLista });
  } catch (error) {
    console.error("Error al crear la lista:", error);
    return NextResponse.json(
      { message: "Error al crear la lista" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, nombre, idioma, nivel } = await req.json();

  if (!id || (!nombre && !idioma && !nivel)) {
    return NextResponse.json(
      { message: "Se requiere el ID y al menos un campo a actualizar" },
      { status: 400 }
    );
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "Error al recuperar la información del usuario desde Kinde" },
      { status: 401 }
    );
  }

  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { message: "Usuario no encontrado en la base de datos" },
      { status: 404 }
    );
  }

  const lista = await getListaById(Number(id));

  if (!lista) {
    return NextResponse.json(
      { message: "Lista no encontrada" },
      { status: 404 }
    );
  }

  if (lista.userId !== dbUser.id) {
    return NextResponse.json(
      { message: "No tienes permiso para editar esta lista" },
      { status: 403 }
    );
  }

  try {
    const listaActualizada = await updateLista(Number(id), {
      nombre,
      idioma,
      nivel,
    });
    return NextResponse.json({
      message: "Lista actualizada correctamente",
      lista: listaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar la lista:", error);
    return NextResponse.json(
      { message: "Error al actualizar la lista" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Se requiere el ID de la lista" },
      { status: 400 }
    );
  }

  try {
    await deleteLista(Number(id));
    return NextResponse.json({
      message: "Se ha borrado la lista correctamente",
      id,
    });
  } catch (error) {
    console.error("Error al borrar la lista:", error);
    return NextResponse.json(
      { message: "Error al borrar la lista" },
      { status: 500 }
    );
  }
}
