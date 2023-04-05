import React from "react";
import IconBoard from "../assets/icon-board.svg";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../Store/KanbanTaskSlice";
import useWindow from "../Hooks/useWindow";
import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeProvider";
export default function Board({ board, changeToggle, chosenBoardId }) {
  const dispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const themeCtx = useContext(DarkModeContext);
  // //${
  //   isClicked ? "bg-mainPurple text-white rounded-r-full" : "bg-white"
  // }
  return (
    <button
      onClick={() => {
        dispatch(kanbanAction.chooseBoard(board));
        changeToggle();
      }}
      className={`flex space-x-4 text-mediumGrey hover:text-white hover:bg-mainPurple  hover:rounded-r-full items-center p-8 h-20 w-auto ${
        chosenBoardId === board.id
          ? "bg-mainPurple text-white rounded-r-full"
          : `${themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"}`
      } `}
    >
      <svg
        width="16"
        height="16"
        className="fill-current hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
      </svg>
      <h3>{board.name}</h3>
    </button>
  );
}
