import React, { useContext, useEffect, useState, useRef } from "react";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import useToggle from "../../Hooks/UseToggle";
import Modal from "../Modals/Modal";
import ViewTaskModal from "../Modals/ViewTaskModal";

import useLongPress from "../../Hooks/UseLongPress";
import DeleteTask from "../Modals/DeleteTask";
import { useDispatch } from "react-redux";
export default function Task({
  title,
  description,
  subtasks,
  subtaskLength,
  colIndex,
  taskIndex,
  innerRef,
  provided,
}) {
  const themeCtx = useContext(DarkModeContext);
  const openModal = useToggle(false);
  const deleteModal = useToggle(false);
  const dispatch = useDispatch();
  const { handlers } = useLongPress(openModal, deleteModal, dispatch);
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
    <>
      <div
        {...handlers}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        className={`shadow-xl flex flex-col p-8 rounded-xl  w-[17.5rem] ${
          themeCtx.theme === "light" ? "bg-lightGrey" : "bg-darkGrey text-white"
        } `}
      >
        <h3 className="font-bold text-md">{title}</h3>
        <p className="font-bold text-mediumGrey">
          {counter} of {subtaskLength} substasks
        </p>
      </div>
      {openModal.isToggle && (
        <Modal onClick={openModal.changeToggle}>
          <ViewTaskModal
            openModalToggle={openModal.changeToggle}
            taskIndex={taskIndex}
            colIndex={colIndex}
            title={title}
            description={description}
            subtasks={subtasks}
          ></ViewTaskModal>
        </Modal>
      )}
      {deleteModal.isToggle && (
        <Modal onClick={deleteModal.changeToggle}>
          <DeleteTask
            onCancel={deleteModal.changeToggle}
            taskIndex={taskIndex}
            colIndex={colIndex}
          ></DeleteTask>
        </Modal>
      )}
    </>
  );
}
