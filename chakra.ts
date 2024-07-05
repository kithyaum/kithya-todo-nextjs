import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
        backgroundColor: "gray.100",
      },
    },
  },
});

export default theme;
