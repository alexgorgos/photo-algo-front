import * as React from "react";

const getInitialColorMode = () => {
  if (typeof window !== "undefined") {
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
  }

  return null;
};

export const ColorModeContext = React.createContext();

export const ThemeHandler = ({ children }) => {
  const [colorMode, setColorMode] = React.useState(getInitialColorMode());

  const changeColorMode = (newMode) => {
    localStorage.setItem("color-mode", newMode);
    setColorMode(newMode);
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, changeColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
