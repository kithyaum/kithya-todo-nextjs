import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { todo } = await req.json();
  const newTodo = await prisma.todo.create({
    data: { todo, isCompleted: false },
  });
  return NextResponse.json(newTodo);
}
