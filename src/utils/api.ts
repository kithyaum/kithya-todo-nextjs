import axios from "axios";
import { Todo } from "../hooks/useTodos";

// const API_BASE_URL = "https://your-backend-api-url"; // Replace with your actual API base URL

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get(`/api/todo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const createTodoApi = async (newTodo: Todo): Promise<Todo> => {
  try {
    const response = await axios.post(`/api/todo`, newTodo);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodoApi = async (
  id: string,
  updatedTodo: Partial<Todo>
): Promise<Partial<Todo>> => {
  try {
    const response = await axios.put(`/api/todo/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodoApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/todo/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
