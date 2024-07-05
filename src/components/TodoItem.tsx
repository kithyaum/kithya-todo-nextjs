import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
};

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  loadingAction: boolean;
};

const TodoItem: React.FC<Props> = ({
  todo,
  loadingAction,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [hideActionButton, setHideActionButton] = useState(true);
  return (
    <Box
      p={2}
      bg="white"
      borderRadius="md"
      shadow="md"
      onMouseEnter={() => setHideActionButton(false)}
      onMouseLeave={() => setHideActionButton(true)}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Text
          as={todo.isCompleted ? "del" : "span"}
          cursor="pointer"
          onClick={() => onToggleComplete(todo.id, !todo.isCompleted)}
        >
          {todo.todo}
        </Text>
        <div
          className={`${
            hideActionButton ? "opacity-0 scale-0" : "opacity-100 scale-100"
          } transition-transform ease-in-out delay-0 duration-100 space-x-2`}
        >
          {loadingAction ? (
            <Spinner color="green.300" />
          ) : (
            <>
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit Todo"
                size="sm"
                isLoading={loadingAction}
                onClick={() => onEdit(todo)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete Todo"
                size="sm"
                onClick={() => onDelete(todo.id)}
                isLoading={loadingAction}
              />
              <IconButton
                isLoading={loadingAction}
                icon={
                  <Checkbox colorScheme="green" isChecked={todo.isCompleted} />
                }
                aria-label={
                  todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"
                }
                size="sm"
                onClick={() => onToggleComplete(todo.id, !todo.isCompleted)}
              />
            </>
          )}
        </div>
      </Stack>
    </Box>
  );
};

export default TodoItem;
