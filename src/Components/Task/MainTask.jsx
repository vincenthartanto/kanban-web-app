import React, { useState, useContext, useEffect } from "react";
import Task from "./Task";
import StatusTask from "./StatusTask";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import useToggle from "../../Hooks/UseToggle";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDropabble";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
import Modal from "../Modals/Modal";
import AddNewBoard from "../Modals/AddNewBoard";
import EditNewBoard from "../Modals/EditNewBoard";
export default function MainTask() {
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const dispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const openNewBoardModal = useToggle(false);
  const editNewBoard = useToggle(false);
  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      // if destination null
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //if the position is the same then dont do anything
      return;
    }

    dispatch(
      kanbanAction.moveTask({
        chosenTaskId: draggableId,
        sourceTaskIndex: source.index,
        sourceTaskDestinationIndex: destination.index,
        sourceColumnName: source.droppableId,
        destinationColumnName: destination.droppableId,
      })
    );
  };
  return chosenIndex === -1 ? (
    <main
      className={`flex flex-col items-center justify-center h-screen space-y-4 ${
        themeCtx.theme === "light" ? "bg-lightGrey" : "bg-veryDarkGrey"
      }`}
    >
      <p className="font-bold text-mediumGrey text-center  text-[1.1rem]">
        This form is empty. Create a new column to get started
      </p>
      <button
        onClick={openNewBoardModal.changeToggle}
        f
        className="bg-mainPurple text-white rounded-full p-4"
      >
        + Add New column
      </button>
      {openNewBoardModal.isToggle && (
        <Modal onClick={openNewBoardModal.changeToggle}>
          <AddNewBoard
            changeToggle={openNewBoardModal.changeToggle}
          ></AddNewBoard>
        </Modal>
      )}
    </main>
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <main
        className={`${
          themeCtx.theme === "light" ? "bg-lightGrey" : "bg-veryDarkGrey"
        } p-4 space-y-4 overflow-scroll h-[93.9%] `}
      >
        <div className="flex space-x-16">
          {chosenBoard.columns.map((col, colIndex) => {
            return (
              <StrictModeDroppable
                key={col.id}
                index={colIndex}
                droppableId={col.id}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col space-y-2 min-w-[15rem] "
                  >
                    <StatusTask
                      name={col.name}
                      tasksLength={col.tasks.length}
                    ></StatusTask>

                    {col.tasks.length !== 0 &&
                      col.tasks.map((tsk, taskIndex) => {
                        {
                          console.log(tsk.id);
                        }
                        return (
                          <Draggable
                            key={tsk.id}
                            draggableId={tsk.id}
                            index={taskIndex}
                          >
                            {(provided) => (
                              <Task
                                innerRef={provided.innerRef}
                                provided={provided}
                                colIndex={colIndex}
                                taskIndex={taskIndex}
                                key={taskIndex}
                                title={tsk.title}
                                description={tsk.description}
                                subtasks={tsk.subtasks}
                                subtaskLength={tsk.subtasks?.length}
                              ></Task>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            );
          })}
          <button
            onClick={editNewBoard.changeToggle}
            className={`grid place-items-center  border-2 mt-8  p-8  ${
              themeCtx.theme === "light"
                ? "bg-lightGrey"
                : "bg-darkGrey border-darkGrey"
            }`}
          >
            <p className={`text-2xl text-mediumGrey `}>+ New Column</p>
          </button>
        </div>
      </main>
      {editNewBoard.isToggle && (
        <Modal onClick={editNewBoard.changeToggle}>
          <EditNewBoard changeToggle={editNewBoard.changeToggle}></EditNewBoard>
        </Modal>
      )}
    </DragDropContext>
  );
}
