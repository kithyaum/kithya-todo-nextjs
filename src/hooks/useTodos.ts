// "use client";
// import { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";
// import {
//   createTodoApi,
//   deleteTodoApi,
//   fetchTodos,
//   updateTodoApi,
// } from "../utils/api";

// export type Todo = {
//   id: string;
//   todo: string;
//   isCompleted: boolean;
//   createdAt: string;
// };

// const useTodos = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchTodos();
//       setTodos(data);
//     };
//     fetchData();
//   }, []);

//   const addTodo = async (todoText: string) => {
//     const newTodo = {
//       id: uuid(),
//       todo: todoText,
//       isCompleted: false,
//       createdAt: new Date().toISOString(),
//     };

//     const createdTodo = await createTodoApi(newTodo);
//     setTodos([...todos, createdTodo]);
//   };

//   const editTodo = async (id: string, updatedTodo: Partial<Todo>) => {
//     const updated = await updateTodoApi(id, updatedTodo);
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
//     );
//   };

//   const removeTodo = async (id: string) => {
//     await deleteTodoApi(id);
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   return { todos, addTodo, editTodo, removeTodo };
// };

// export default useTodos;
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  createTodoApi,
  deleteTodoApi,
  fetchTodos,
  updateTodoApi,
} from "../utils/api";

export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addTodo = async (todoText: string) => {
    setLoadingAction(true);
    if (!todoText.trim()) {
      setError("Todo cannot be empty");
      setLoadingAction(false);
      return;
    }

    if (
      todos.some((todo) => todo.todo.toLowerCase() === todoText.toLowerCase())
    ) {
      setError("Todo already exists");
      setLoadingAction(false);
      return;
    }

    setError(null);

    const newTodo = {
      id: uuid(),
      todo: todoText,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const createdTodo = await createTodoApi(newTodo);
    setTodos([...todos, createdTodo]);
    setLoadingAction(false);
  };

  const editTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    setLoadingAction(true);
    const updated = await updateTodoApi(id, updatedTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
    );
    setLoadingAction(false);
  };

  const removeTodo = async (id: string) => {
    setLoadingAction(true);
    await deleteTodoApi(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setLoadingAction(false);
  };

  return {
    todos,
    addTodo,
    editTodo,
    removeTodo,
    error,
    loading,
    loadingAction,
  };
};

export default useTodos;
