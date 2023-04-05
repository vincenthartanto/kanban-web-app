import React, { useContext, useState } from "react";
import Input from "../Input";
import SubHeading from "../SubHeading";
import MultipleInput from "../Task/MultipleInput";
import Status from "../Status";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import { useReducer } from "react";
import useForm from "../../Hooks/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
import randomString from "../../Function/RandomString";
export default function AddNewTaskModal({ changeToggle }) {
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const { state, dispatch } = useForm({
    id: randomString(10),
    title: "",
    decription: "",
    subInput: [
      {
        id: randomString(10),
        title: "",
        isCompleted: false,
      },
    ],
    status: chosenBoard.columns[0].name,
  });
  const rdxDispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  function onChangeSubtasks(e) {
    const input = {
      type: "subtasks",
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT", input: input });
  }
  function onChange(e) {
    const input = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT", input: input });
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[80%] w-[90%] rounded-xl p-8 space-y-4 overflow-scroll`}
    >
      <h1
        className={`font-bold ${
          themeCtx.theme === "light" ? "text-black" : "text-white"
        } `}
      >
        Add New Task
      </h1>
      <form
        onSubmit={() => {
          rdxDispatch(
            kanbanAction.createNewTask({
              id: state.id,
              title: state.title,
              description: state.description,
              subtasks: state.subInput,
              status: state.status,
            })
          );
          changeToggle();
        }}
        className="space-y-4"
      >
        <Input
          labelName={"Title"}
          name="Title"
          placeholder={"e.g. Take coffee break"}
          value={state.title}
          onChange={onChange}
        ></Input>
        <Input
          value={state.description}
          onChange={onChange}
          labelName={"Description"}
          name="Description"
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          }
          isTextArea={true}
        ></Input>
        <SubHeading title="Subtasks"></SubHeading>
        {state.subInput.map((subtask) => {
          return (
            <MultipleInput
              key={subtask.id}
              name={subtask.title}
              value={subtask.title}
              onChange={onChangeSubtasks}
              onRemove={(e) => {
                e.preventDefault();
                dispatch({ type: "DELETE_SUBINPUT", title: subtask.title });
              }}
            ></MultipleInput>
          );
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            const subtasks = {
              id: randomString(10),
              title: "",
              isCompleted: false,
            };
            dispatch({ type: "ADD_SUBINPUT", subInput: subtasks });
          }}
          className={` text-mainPurple font-medium w-full rounded-full p-4 ${
            themeCtx.theme === "light"
              ? "bg-mainPurple  bg-opacity-10"
              : "bg-white"
          }`}
        >
          +Add New Subtasks
        </button>
        <SubHeading title={"Status"}></SubHeading>
        <Status onChange={onChange} value={state.status}></Status>

        <button
          // onClick={(e) => {
          //   e.preventDefault();
          //   rdxDispatch(
          //     kanbanAction.createNewTask({
          //       id: state.id,
          //       title: state.title,
          //       description: state.description,
          //       subtasks: state.subInput,
          //       status: state.status,
          //     })
          //   );
          //   changeToggle();
          // }}
          className="bg-mainPurple text-white w-full rounded-full p-4"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
