// "use client";
// import { Alert, AlertIcon, Button, Input, Stack } from "@chakra-ui/react";
// import { FormEvent, useEffect, useState } from "react";

// type Props = {
//   onAddTodo: (todo: string) => void;
//   editingTodo: { id: string; todo: string } | null;
//   onUpdateTodo: (id: string, todo: string) => void;
//   error: string | null;
// };

// const TodoForm: React.FC<Props> = ({
//   onAddTodo,
//   editingTodo,
//   onUpdateTodo,
//   error,
// }) => {
//   const [todo, setTodo] = useState(editingTodo ? editingTodo.todo : "");

//   useEffect(() => {
//     if (editingTodo) {
//       setTodo(editingTodo.todo);
//     }
//   }, [editingTodo]);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (todo.trim()) {
//       if (editingTodo) {
//         onUpdateTodo(editingTodo.id, todo);
//       } else {
//         onAddTodo(todo);
//       }
//       setTodo("");
//     } else {
//       alert("Todo cannot be empty");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack direction="row" mb={4}>
//         <Input
//           type="text"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//           placeholder="Add a new todo"
//         />
//         <Button type="submit" colorScheme="blue">
//           {editingTodo ? "Update" : "Add"}
//         </Button>
//       </Stack>
//       {error && (
//         <Alert status="error">
//           <AlertIcon />
//           {error}
//         </Alert>
//       )}
//     </form>
//   );
// };

// export default TodoForm;
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  onAddTodo: (todo: string) => void;
  editingTodo: { id: string; todo: string } | null;
  onUpdateTodo: (id: string, todo: string) => void;
  error: string | null;
  loading: boolean;
};

const TodoForm: React.FC<Props> = ({
  onAddTodo,
  onUpdateTodo,
  editingTodo,
  error,
  loading,
}) => {
  const [todoText, setTodoText] = useState(editingTodo ? editingTodo.todo : "");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todoText.trim()) {
      if (editingTodo) {
        onUpdateTodo(editingTodo.id, todoText);
      } else {
        onAddTodo(todoText);
      }
      setTodoText("");
    } else {
      setIsError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
    if (e.target.value.trim()) {
      setIsError(false);
    }
  };
  useEffect(() => {
    if (editingTodo) {
      setTodoText(editingTodo.todo);
    }
  }, [editingTodo]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={isError || Boolean(error)} mb={4}>
        <FormLabel>Todo</FormLabel>
        <Stack direction="row">
          <Input
            type="text"
            value={todoText}
            onChange={handleInputChange}
            placeholder="Add a new todo"
          />
          <Button isLoading={loading} type="submit" colorScheme="blue">
            {editingTodo ? "Update" : "Add"}
          </Button>
        </Stack>
        {!isError && !error ? (
          <FormHelperText>Enter the task you need to do.</FormHelperText>
        ) : (
          <FormErrorMessage>{error || "Todo cannot be empty"}</FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
};

export default TodoForm;
