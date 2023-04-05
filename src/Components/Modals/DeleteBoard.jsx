import React, { useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";

export default function DeleteBoard({ changeToggle }) {
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const dispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[40%] w-[90%] rounded-xl p-8 space-y-4 overflow-scroll md:w-[50%] md:min-h-[40%]`}
    >
      <h1 className="text-mainRed font-medium">Delete this board?</h1>
      <p className="text-mediumGrey">
        Are you sure you want to delete the ‘{chosenBoard.name} board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <button
        onClick={() => {
          dispatch(kanbanAction.deleteBoard());
          changeToggle();
        }}
        className="bg-mainRed text-white w-full rounded-full p-2"
      >
        Delete
      </button>
      <button
        onClick={changeToggle}
        className={` ${
          themeCtx.theme === "light"
            ? "bg-opacity-20 bg-mainPurple"
            : "bg-white"
        }  text-mainPurple font-medium w-full rounded-full p-2`}
      >
        Cancel
      </button>
    </div>
  );
}
