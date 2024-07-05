"use client";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import useTodos from "@/hooks/useTodos";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";

type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
};

export default function Home() {
  const {
    todos,
    addTodo,
    editTodo,
    removeTodo,
    error,
    loading,
    loadingAction,
  } = useTodos();
  const [editingTodo, setEditingTodo] = useState<{
    id: string;
    todo: string;
  } | null>(null);
  const [filter, setFilter] = useState("");

  const handleAddTodo = (todo: string) => {
    addTodo(todo);
  };

  const handleEditTodo = (id: string, updatedTodo: string) => {
    editTodo(id, { todo: updatedTodo, isCompleted: false });
    setEditingTodo(null);
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo({ id: todo.id, todo: todo.todo });
  };

  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    editTodo(id, {
      todo: todos.find((todo: Todo) => todo.id === id)?.todo || "",
      isCompleted,
    });
  };

  const filteredTodos = todos.filter((todo: Todo) =>
    todo.todo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box p={6} mx="auto" className="w-full md:max-w-[70%]">
      <TodoForm
        onAddTodo={handleAddTodo}
        editingTodo={editingTodo}
        onUpdateTodo={handleEditTodo}
        error={error} loading={loadingAction}      />

      {/* <TodoForm
        onAddTodo={handleAddTodo}
        editingTodo={editingTodo}
        onUpdateTodo={handleEditTodo}
      /> */}
      <Input
        type="text"
        placeholder="Filter todos"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        mb={4}
      />
      <TodoList
        todos={filteredTodos}
        onEdit={handleEditClick}
        onDelete={removeTodo}
        onToggleComplete={handleToggleComplete}
        loading={loading}
        loadingAction={loadingAction}
      />
    </Box>
  );
}
