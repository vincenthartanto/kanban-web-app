import React, { useContext, useState, useEffect } from "react";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import Subtasks from "../Task/Subtasks";

import SubHeading from "../SubHeading";
import Status from "../Status";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import useToggle from "../../Hooks/UseToggle";
import DeleteTask from "./DeleteTask";
import Modal from "./Modal";
import EditTask from "./EditTask";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
export default function ViewTaskModal({
  title,
  description,
  subtasks,
  colIndex,
  taskIndex,
  openModalToggle,
}) {
  const themeCtx = useContext(DarkModeContext);
  const editTask = useToggle(false);
  const ellipsisToggle = useToggle(false);
  const deleteModal = useToggle(false);
  const [counter, setCounter] = useState(0);
  function countCompletedSubtasks() {
    setCounter(0);
    for (let sb of subtasks) {
      if (sb.isCompleted) {
        setCounter((counter) => counter + 1);
      }
    }
  }
  useEffect(() => {
    countCompletedSubtasks();
  }, [subtasks]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[80%] min-w-[90%] max-w-[100%] rounded-xl p-8 space-y-4 overflow-scroll relative md:w-[50%] md:min-h-[20%]`}
    >
      {deleteModal.isToggle && (
        <Modal onClick={deleteModal.changeToggle}>
          <DeleteTask
            onCancel={deleteModal.changeToggle}
            taskIndex={taskIndex}
            colIndex={colIndex}
          ></DeleteTask>
        </Modal>
      )}
      {ellipsisToggle.isToggle && (
        <div className="absolute w-44 min-h-38 right-8 top-20 bg-white z-10 rounded-xl shadow-md flex flex-col items-start p-4 space-y-4">
          <button
            onClick={() => {
              editTask.changeToggle();
              ellipsisToggle.changeToggle();
            }}
            className="text-mediumGrey"
          >
            Edit Task
          </button>
          <button
            onClick={() => {
              deleteModal.changeToggle();
              ellipsisToggle.changeToggle();
            }}
            className="text-red-500"
          >
            Delete Task
          </button>
        </div>
      )}
      <div className="flex items-center space-x-4 justify-between">
        <h2
          className={`font-bold ${
            themeCtx.theme === "light" ? "text-black" : "text-white"
          }  text-[1.1rem]`}
        >
          {title}
        </h2>
        <button onClick={ellipsisToggle.changeToggle}>
          <img src={VerticalEllipsis} className="h-[1.5rem]"></img>
        </button>
      </div>
      <p className="text-medium text-mediumGrey leading-6">{description}</p>
      <SubHeading
        title={`Subtasks (${counter} of ${subtasks.length} )`}
      ></SubHeading>
      {subtasks.map((sb, index) => {
        return (
          <Subtasks
            taskIndex={taskIndex}
            colIndex={colIndex}
            subtaskIndex={index}
            key={sb.title}
            title={sb.title}
            isCompleted={sb.isCompleted}
          ></Subtasks>
        );
      })}

      <h3 className="font-semibold text-mediumGrey text-sm  leading-3">
        Current Status
      </h3>
      <Status
        colIndex={colIndex}
        taskIndex={taskIndex}
        moveStatus={true}
      ></Status>
      {editTask.isToggle && (
        <Modal onClick={editTask.changeToggle}>
          <EditTask
            openModalToggle={openModalToggle}
            changeToggle={editTask.changeToggle}
            colIndex={colIndex}
            taskIndex={taskIndex}
          ></EditTask>
        </Modal>
      )}
    </div>
  );
}
