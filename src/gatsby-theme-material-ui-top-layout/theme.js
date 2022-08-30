import { createTheme } from "@mui/material";
import "@fontsource/poppins";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
