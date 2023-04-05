import React, { useContext } from "react";
import IconCross from "../../assets/icon-cross.svg";
import { DarkModeContext } from "../../Context/DarkModeProvider";
export default function MultipleInput({ value, name, onChange, onRemove }) {
  const themeCtx = useContext(DarkModeContext);
  return (
    <div className="flex items-center space-x-4">
      <input
        className={`border p-2 w-full rounded-md  pl-4 ${
          themeCtx.theme === "light"
            ? "bg-white textblack"
            : "bg-darkGrey text-white"
        }`}
        name={name}
        required
        placeholder="e.g. Make coffee"
        value={value}
        onChange={onChange}
      ></input>
      <button onClick={onRemove}>
        <img className="w-4 h-4" src={IconCross}></img>
      </button>
    </div>
  );
}
