import * as React from "react";
import { ColorModeButton } from "../ColorModeButton";
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../ThemeHandler";
import { Navigation } from "../Navigation";

export const Layout = ({ children }) => {
  const { colorMode } = React.useContext(ColorModeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  if (!colorMode) {
    return null;
  }

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <ColorModeButton />
      <Navigation navName={"main"} />
      {children}
    </ThemeProvider>
  );
};
