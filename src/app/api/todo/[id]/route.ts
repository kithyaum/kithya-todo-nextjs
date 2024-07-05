import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { todo, isCompleted } = await req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { todo, isCompleted },
  });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.todo.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}
