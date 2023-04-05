import React, { useContext } from "react";
import SubHeading from "./SubHeading";
import { DarkModeContext } from "../Context/DarkModeProvider";

export default function Input({
  labelName,
  name,
  placeholder,
  value,
  onChange,
  isTextArea = false,
}) {
  const themeCtx = useContext(DarkModeContext);
  return (
    <div className={`flex flex-col space-y-2 overflow-scroll `}>
      <label>
        <SubHeading title={labelName}></SubHeading>
      </label>
      {isTextArea === false ? (
        <input
          name={name}
          className={`border p-4 rounded-xl ${
            themeCtx.theme === "light"
              ? "bg-white text-black"
              : "bg-darkGrey border border-mediumGrey text-white"
          }`}
          required
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        ></input>
      ) : (
        <textarea
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          required
          className={`p-4 border min-h-[8rem] ${
            themeCtx.theme === "light"
              ? "bg-white text-black"
              : "bg-darkGrey border border-mediumGrey text-white"
          }`}
        ></textarea>
      )}
    </div>
  );
}
