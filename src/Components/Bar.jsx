import React, { useContext, useState, useEffect } from "react";
import KanbanLogo from "../assets/logo-mobile.svg";
import ChevronIcon from "../assets/icon-chevron-down.svg";
import ChevronIconUp from "../assets/icon-chevron-up.svg";
import EllipsisIcon from "../assets/icon-vertical-ellipsis.svg";
import { DarkModeContext } from "../Context/DarkModeProvider";
import useToggle from "../Hooks/UseToggle";
import Modal from "./Modals/Modal";
import ListBoardModal from "./Modals/ListBoardModal";
import DeleteBoard from "./Modals/DeleteBoard";
import AddNewTaskModal from "./Modals/AddNewTaskModal";
import { useSelector } from "react-redux";
import EditNewBoard from "./Modals/EditNewBoard";
import useWindow from "../Hooks/useWindow";
export default function Bar() {
  const themeCtx = useContext(DarkModeContext);
  const openChevron = useToggle(false);
  const addNewTask = useToggle(false);
  const deleteBoard = useToggle(false);
  const editNewBoard = useToggle(false);
  const ellipsisToggle = useToggle(false);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const width = useWindow();
  return (
    <header
      className={`flex shadow-md space-x-2 p-3 items-center justify-between w-full px-8 ${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey text-white"
      }`}
    >
      {ellipsisToggle.isToggle && (
        <div className="absolute w-44 min-h-38 right-8 top-20 bg-white z-10 rounded-xl shadow-md flex flex-col items-start p-4 space-y-4">
          <button
            onClick={() => {
              editNewBoard.changeToggle();
              ellipsisToggle.changeToggle();
            }}
            className="text-mediumGrey"
          >
            Edit Board
          </button>
          <button
            onClick={() => {
              deleteBoard.changeToggle();
              ellipsisToggle.changeToggle();
            }}
            className="text-red-500"
          >
            Delete Board
          </button>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <img className="h-[1.5rem] w-[1.5rem] md:hidden" src={KanbanLogo}></img>

        <button
          onClick={
            chosenIndex === -1
              ? openChevron.changeToggle
              : editNewBoard.changeToggle
          }
          className="font-bold text-[1.1rem]"
        >
          {chosenIndex === -1 ? "Add New Board" : chosenBoard.name}
        </button>
        <button onClick={openChevron.changeToggle}>
          <img
            className="h-2 w-2 md:hidden"
            src={openChevron.isToggle ? ChevronIconUp : ChevronIcon}
          ></img>
        </button>
      </div>
      <div className="flex items-center justify-end space-x-4">
        <button
          onClick={chosenIndex === -1 ? undefined : addNewTask.changeToggle}
          className={`bg-mainPurple  rounded-full p-2 w-12 font-bold text-white md:w-full md:p-4 ${
            chosenIndex === -1 ? "opacity-50" : ""
          } `}
        >
          {width < 768 ? "+" : "+ Add New Task"}
        </button>
        <button
          onClick={chosenIndex === -1 ? undefined : ellipsisToggle.changeToggle}
        >
          <img className="h-4" src={EllipsisIcon}></img>
        </button>
      </div>
      {addNewTask.isToggle && (
        <Modal onClick={addNewTask.changeToggle}>
          <AddNewTaskModal
            changeToggle={addNewTask.changeToggle}
          ></AddNewTaskModal>
        </Modal>
      )}
      {openChevron.isToggle && (
        <Modal onClick={openChevron.changeToggle}>
          <ListBoardModal
            changeToggle={openChevron.changeToggle}
          ></ListBoardModal>
        </Modal>
      )}
      {deleteBoard.isToggle && (
        <Modal onClick={deleteBoard.changeToggle}>
          <DeleteBoard changeToggle={deleteBoard.changeToggle}></DeleteBoard>
        </Modal>
      )}
      {editNewBoard.isToggle && (
        <Modal onClick={editNewBoard.changeToggle}>
          <EditNewBoard changeToggle={editNewBoard.changeToggle}></EditNewBoard>
        </Modal>
      )}
    </header>
  );
}
