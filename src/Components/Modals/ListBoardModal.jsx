import React, { useContext } from "react";
import SubHeading from "../SubHeading";
import IconBoard from "../../assets/icon-board-purple.svg";
import IconLight from "../../assets/icon-light-theme.svg";
import IconDark from "../../assets/icon-dark-theme.svg";
import Board from "../Board";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import useToggle from "../../Hooks/UseToggle";
import Modal from "./Modal";
import AddNewBoard from "./AddNewBoard";
import { useSelector } from "react-redux";
export default function ListBoardModal({ changeToggle }) {
  const themeCtx = useContext(DarkModeContext);
  const openBoardModal = useToggle(false);
  const boards = useSelector((state) => state.kanban.board);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[40%] max-w-[65%]  rounded-xl  space-y-4 overflow-scroll mx-auto mt-4 md:w-[50%] md:min-h-[40%] `}
    >
      <h2 className="m-4 tracking-widest text-mediumGrey font-medium text-sm">
        ALL BOARDS ({boards.length})
      </h2>
      <div className="pr-4">
        {boards.map((board) => {
          return (
            <Board
              changeToggle={changeToggle}
              key={board.name}
              board={board}
            ></Board>
          );
        })}

        <button
          onClick={openBoardModal.changeToggle}
          className="flex p-4 text-mainPurple hover:bg-mainPurple  hover:text-white space-x-4 items-center"
        >
          <svg
            width="16"
            height="16"
            className="fill-current hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
          </svg>
          <h3 className="font-medium "> +Create New Board</h3>
        </button>
      </div>
      <div className="mx-4">
        <div
          className={`${
            themeCtx.theme === "light" ? "bg-lightGrey" : "bg-veryDarkGrey"
          }  flex justify-center items-center p-4 rounded-md space-x-2 w-full`}
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
      {openBoardModal.isToggle && (
        <Modal onClick={openBoardModal.changeToggle}>
          <AddNewBoard changeToggle={openBoardModal.changeToggle}></AddNewBoard>
        </Modal>
      )}
    </div>
  );
}
