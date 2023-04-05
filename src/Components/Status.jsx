import React, { useContext, useState } from "react";
import ChevronIcon from "../assets/icon-chevron-down.svg";
import { DarkModeContext } from "../Context/DarkModeProvider";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../Store/KanbanTaskSlice";
import { current } from "@reduxjs/toolkit";
export default function Status({
  value,
  onChange,
  onChangeStatus,
  moveStatus = false,
  taskIndex,
  colIndex,
}) {
  // lupa array destructuring

  const dispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const status =
    moveStatus === false
      ? ""
      : chosenBoard.columns[colIndex].tasks[taskIndex].status;

  return (
    <select
      name="status"
      className={`${
        themeCtx.theme === "light"
          ? "bg-white  border"
          : "bg-darkGrey  border  border-mediumGrey text-white"
      }  w-full p-4 appearance-none  bg-no-repeat bg-right-2`}
      style={{ backgroundImage: `url(${ChevronIcon})` }}
      onChange={
        moveStatus === false
          ? onChange
          : (e) => {
              dispatch(
                kanbanAction.moveStatus({
                  colIndex,
                  taskIndex,
                  status: e.target.value,
                })
              );
            }
      }
      // onChange={onChange}
      value={moveStatus === false ? value : status}
    >
      {chosenBoard.columns.map((col, index) => {
        return (
          <option key={index} value={col.name}>
            {col.name}
          </option>
        );
      })}
    </select>
  );
}
