import { createContext, useState } from "react";

export const DarkModeContext = createContext(null);

import React from "react";

export default function DarkModeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((theme) => {
      if (theme === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };
  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}
