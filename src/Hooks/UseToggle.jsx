import React, { useState } from "react";

export default function useToggle(value) {
  const [isToggle, setIsToggle] = useState(value);
  const changeToggle = () => {
    setIsToggle((value) => !value);
  };
  return { isToggle, changeToggle };
}
