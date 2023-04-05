import React, { useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
import { useDispatch } from "react-redux";

export default function Subtasks({
  title,
  isCompleted,
  taskIndex,
  colIndex,
  subtaskIndex,
}) {
  const themeCtx = useContext(DarkModeContext);
  const kanbanAction = KanbanTaskSliceAction;
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`${
          themeCtx.theme === "light" ? "bg-lightGrey" : "bg-veryDarkGrey"
        } flex items-center space-x-4 leading-5 p-4`}
      >
        <input
          checked={isCompleted}
          className="accent-mainPurple h-8 w-8 rounded-xl"
          type="checkbox"
          onChange={() => {
            dispatch(
              kanbanAction.toggleCheckboxTask({
                taskIndex,
                colIndex,
                subtaskIndex,
              })
            );
          }}
        ></input>
        <label
          className={`font-semibold ${
            themeCtx.theme === "light"
              ? `${isCompleted ? "text-mediumGrey" : "text-black"}`
              : `${isCompleted ? "text-mediumGrey" : "text-white"}`
          }`}
        >
          {title}
        </label>
      </div>
    </>
  );
}
