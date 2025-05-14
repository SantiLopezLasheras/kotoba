import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByEmail } from "@/lib/dbqueries/getUser";
import { getListaById } from "@/lib/dbqueries/getListaById";
import { createLista } from "@/lib/dbqueries/createLista";
import { updateLista } from "@/lib/dbqueries/updateLista";
import { deleteLista } from "@/lib/dbqueries/deleteLista";
import { newListaSchema } from "@/lib/zodSchemas";
import { updateListaSchema } from "@/lib/zodSchemas";

export async function POST(req: NextRequest) {
  // const { nombre, idioma, nivel } = await req.json();
  const json = await req.json();

  const result = newListaSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json(
      { message: "Datos inválidos", errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const { nombre, idioma, nivel, public: isPublic = false } = result.data;

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
    const newLista = await createLista({
      nombre,
      idioma,
      nivel,
      public: isPublic,
      userId,
    });
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
  // const { id, nombre, idioma, nivel } = await req.json();

  const json = await req.json();

  // Validate the request body using Zod schema
  const result = updateListaSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json(
      { message: "Datos inválidos", errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const { id, nombre, idioma, nivel } = result.data;

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

  const updatedFields: Partial<{
    nombre: string;
    idioma: string;
    nivel: string;
  }> = {};

  if (nombre) updatedFields.nombre = nombre;
  if (idioma) updatedFields.idioma = idioma;
  if (nivel) updatedFields.nivel = nivel;

  try {
    const listaActualizada = await updateLista(Number(id), updatedFields);
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
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json(
      { message: "Se requiere el ID de la lista" },
      { status: 400 }
    );
  }

  try {
    await deleteLista(id);
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
