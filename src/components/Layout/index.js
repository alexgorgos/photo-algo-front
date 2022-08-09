import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeButton } from "../ColorModeButton";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const Layout = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = React.useState();

  React.useEffect(() => {
    if (localStorage.getItem("prefers-dark-color")) {
      const dark = localStorage.getItem("prefers-dark-color") === "true";
      setMode(dark ? "dark" : "light");
    } else {
      setMode(prefersDarkMode ? "dark" : "light");
      localStorage.setItem("prefers-dark-color", prefersDarkMode);
    }
    console.log(prefersDarkMode);
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const dark = localStorage.getItem("prefers-dark-color") === "true";
        localStorage.setItem("prefers-dark-color", !dark);
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ColorModeButton />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
