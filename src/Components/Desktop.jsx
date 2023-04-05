import React from "react";
import Bar from "./Bar";
import MainTask from "./Task/MainTask";
import { DarkModeContext } from "../Context/DarkModeProvider";
import { useContext } from "react";
import LogoLight from "../assets/logo-dark.svg";
import LogoDark from "../assets/logo-light.svg";
export default function Desktop() {
  const themeCtx = useContext(DarkModeContext);
  return (
    <div className="flex bg-white w-screen">
      <div
        className={`grid place-items-center shadow-md p-4 ${
          themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
        }`}
      >
        <img
          className="w-[100%]"
          src={themeCtx.theme === "light" ? LogoLight : LogoDark}
        ></img>
      </div>
      <Bar></Bar>
    </div>
  );
}
