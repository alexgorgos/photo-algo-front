import * as React from "react";
import { ColorModeButton } from "../ColorModeButton";
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../ThemeHandler";

export const Layout = ({ children }) => {
  const { colorMode, changeColorMode } = React.useContext(ColorModeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <ColorModeButton />
      {children}
    </ThemeProvider>
  );
};
