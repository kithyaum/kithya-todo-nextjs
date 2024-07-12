import { CircularProgress, List, ListItem } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
};

type Props = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  loading: boolean;
  loadingAction: boolean;
  editTodo: {
    id: string;
    todo: string;
  } | null;
};

const TodoList: React.FC<Props> = ({
  todos,
  loading,
  loadingAction,
  onEdit,
  onDelete,
  onToggleComplete,
  editTodo,
}) => {
  console.log("loading", loading);
  return (
    <List spacing={3} className="w-full">
      {loading ? (
        <ListItem className="items-center justify-center mx-auto flex">
          <CircularProgress isIndeterminate color="green.300" />
        </ListItem>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <ListItem key={todo.id}>
            <TodoItem
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              loadingAction={loadingAction}
              isEditing={editTodo ? editTodo?.id == todo.id : false}
            />
          </ListItem>
        ))
      ) : (
        <ListItem>No result. Create a new one instead!</ListItem>
      )}
    </List>
  );
};

export default TodoList;
