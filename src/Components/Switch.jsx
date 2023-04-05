import React from "react";
import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeProvider";

import IconLight from "../assets/icon-light-theme.svg";
import IconDark from "../assets/icon-dark-theme.svg";
export default function Switch() {
  const themeCtx = useContext(DarkModeContext);
  return (
    <div className="mx-4 w-full md:mx-0 ">
      <div
        className={`${
          themeCtx.theme === "light" ? "bg-lightGrey" : "bg-veryDarkGrey"
        }  flex justify-center items-center p-4 rounded-md space-x-2 w-full relative z-10`}
      >
        <img className="h-4 w-4" src={IconLight}></img>
        <label
          htmlFor="check"
          className="bg-mainPurple cursor-pointer bg-opacity-100 w-8 h-4 rounded-full relative peer-checked:bg-opacity-100"
        >
          {themeCtx.theme === "light" ? (
            <input
              onChange={themeCtx.toggleTheme}
              id="check"
              type="checkbox"
              className="sr-only peer"
            ></input>
          ) : (
            <input
              onChange={themeCtx.toggleTheme}
              id="check"
              checked={true}
              type="checkbox"
              className="sr-only peer"
            ></input>
          )}

          <span className="rounded-full bg-white h-[100%] w-[50%] absolute peer-checked:bg-slate-700 peer-checked:right-0 transition-all duration-500"></span>
        </label>
        <img className="h-4 w-4" src={IconDark}></img>
      </div>
    </div>
  );
}
