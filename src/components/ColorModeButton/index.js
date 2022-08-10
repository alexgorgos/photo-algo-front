import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../ThemeHandler";

export const ColorModeButton = () => {
  const { colorMode, changeColorMode } = React.useContext(ColorModeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <Box>
      <IconButton
        onClick={() => {
          changeColorMode(colorMode === "dark" ? "light" : "dark");
        }}
        color="inherit"
      >
        {colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};
