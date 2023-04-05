import React, { useContext } from "react";
import LogoLight from "../assets/logo-dark.svg";
import LogoDark from "../assets/logo-light.svg";
import { useSelector } from "react-redux";
import Board from "./Board";
import useToggle from "../Hooks/UseToggle";
import Switch from "./Switch";
import HideSideBar from "../assets/icon-hide-sidebar.svg";
import { DarkModeContext } from "../Context/DarkModeProvider";
import Modal from "./Modals/Modal";
import AddNewBoard from "./Modals/AddNewBoard";
export default function Sidebar({ hideSidebarToggle }) {
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const boards = useSelector((state) => state.kanban.board);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const openBoardModal = useToggle(false);
  const themeCtx = useContext(DarkModeContext);
  return (
    <div
      className={`md:min-w-[35%]  md:flex md:flex-col items-start  justify-between hidden  ${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      }`}
    >
      <div className="space-y-8 w-full">
        <img
          className="min-w-[25%] m-8"
          src={themeCtx.theme === "light" ? LogoLight : LogoDark}
        ></img>
        <div className="space-y-4">
          <h2 className="tracking-widest text-mediumGrey font-medium text-sm m-8">
            ALL BOARDS ({boards.length})
          </h2>
          <div className="space-y-4">
            {boards.map((board) => {
              return (
                <Board
                  key={board.name}
                  board={board}
                  changeToggle={() => {}}
                  chosenBoardId={chosenBoard?.id}
                ></Board>
              );
            })}
            <button
              onClick={openBoardModal.changeToggle}
              className="flex text-mainPurple h-20 w-auto rounded-r-full p-8 clicked:text-white space-x-4 items-center"
            >
              <svg
                width="16"
                height="16"
                className="fill-current hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
              </svg>
              <h3 className="font-medium"> +Create New Board</h3>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 px-8 py-12">
        <Switch></Switch>
        <button onClick={hideSidebarToggle} className="flex space-x-4">
          <img src={HideSideBar}></img>
          <h2 className="font-bold text-mediumGrey">Hide Sidebar</h2>
        </button>
      </div>
      {openBoardModal.isToggle && (
        <Modal onClick={openBoardModal.changeToggle}>
          <AddNewBoard changeToggle={openBoardModal.changeToggle}></AddNewBoard>
        </Modal>
      )}
    </div>
  );
}
