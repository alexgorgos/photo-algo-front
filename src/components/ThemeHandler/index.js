import * as React from "react";

const getInitialColorMode = () => {
  const localColorMode = window.localStorage.getItem("color-mode");
  const hasLocalColorMode = typeof localColorMode === "string";

  if (hasLocalColorMode) {
    return localColorMode;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQuery = typeof mediaQuery.matches === "boolean";

  if (hasMediaQuery) {
    return mediaQuery.matches ? "dark" : "light";
  }

  return "light";
};

export const ColorModeContext = React.createContext();

export const ThemeHandler = ({ children }) => {
  const [colorMode, setColorMode] = React.useState(getInitialColorMode());

  const changeColorMode = (newMode) => {
    setColorMode(newMode);
    localStorage.setItem("color-mode", newMode);
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, changeColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
