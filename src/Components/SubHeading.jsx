import React, { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeProvider";

export default function SubHeading({ title }) {
  const themeCtx = useContext(DarkModeContext);
  return (
    <h3
      className={`font-medium text-sm  leading-3 ${
        themeCtx.theme === "light" ? "text-mediumGrey" : "text-white"
      }`}
    >
      {title}
    </h3>
  );
}
