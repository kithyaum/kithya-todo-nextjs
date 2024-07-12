import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  onAddTodo: (todo: string) => void;
  editingTodo: { id: string; todo: string } | null;
  onUpdateTodo: (id: string, todo: string) => void;
  error: string | null;
  loading: boolean;
  onEscapseEditMode: () => void;
};

const TodoForm: React.FC<Props> = ({
  onAddTodo,
  onUpdateTodo,
  onEscapseEditMode,
  editingTodo,
  error,
  loading,
}) => {
  const [todoText, setTodoText] = useState(editingTodo ? editingTodo.todo : "");
  const [isError, setIsError] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
  };

  const handleBlur = () => {
    if (textInput.current) {
      textInput.current.blur();
    }
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      handleBlur();
      setTodoText("");
      onEscapseEditMode();
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todoText.trim()) {
      if (editingTodo) {
        onUpdateTodo(editingTodo.id, todoText.trim());
      } else {
        onAddTodo(todoText.trim());
      }
      setTodoText("");
    } else {
      setIsError(true);
    }
  };
  // const onPressKey = (e: KeyboardEvent) => {

  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
    if (e.target.value.trim()) {
      setIsError(false);
    }
  };
  // useEffect(() => {
  //   handleFocus();
  // }, []);
  useEffect(() => {
    if (editingTodo) {
      setTodoText(editingTodo.todo);
      handleFocus();
    }
  }, [editingTodo]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={isError || Boolean(error)} mb={4}>
        <FormLabel>Todo</FormLabel>
        <Stack direction="row">
          <Input
            ref={textInput}
            type="text"
            value={todoText}
            onChange={handleInputChange}
            placeholder="Add a new todo"
            onKeyDownCapture={handleKeyDown}
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
