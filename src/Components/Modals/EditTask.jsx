import React, { useContext } from "react";
import Input from "../Input";
import SubHeading from "../SubHeading";
import MultipleInput from "../Task/MultipleInput";
import Status from "../Status";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../Hooks/UseForm";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
export default function EditTask({
  taskIndex,
  colIndex,
  changeToggle,
  openModalToggle,
}) {
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoardTask = useSelector(
    (state) =>
      state.kanban.board[chosenIndex].columns[colIndex].tasks[taskIndex]
  );
  const rdxDispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const { state, dispatch } = useForm({
    id: chosenBoardTask.id,
    title: chosenBoardTask.title,
    description: chosenBoardTask.description,
    subInput: chosenBoardTask.subtasks,
    status: chosenBoardTask.status,
  });
  function onChange(e) {
    const action = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT", input: action });
  }
  function onChangeSubtasks(e) {
    const action = {
      type: "subtasks",
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT", input: action });
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[80%] w-[90%] rounded-xl p-8 space-y-4 overflow-scroll md:w-[50%] md:min-h-[40%]`}
    >
      <h1
        className={`font-bold ${
          themeCtx.theme === "light" ? "text-black" : "text-white"
        } `}
      >
        Edit Task
      </h1>
      <form
        onSubmit={() => {
          rdxDispatch(
            kanbanAction.EditTask({
              id: state.id,
              title: state.title,
              description: state.description,
              subtasks: state.subInput,
              status: state.status,
              colIndex: colIndex,
              taskIndex: taskIndex,
            })
          );
          changeToggle();
          openModalToggle();
        }}
        className="space-y-4"
      >
        <Input
          labelName={"Title"}
          name={"Title"}
          value={state.title}
          onChange={onChange}
          placeholder={"e.g. Take coffee break"}
        ></Input>
        <Input
          labelName={"Description"}
          name={"Description"}
          value={state.description}
          onChange={onChange}
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          }
          isTextArea={true}
        ></Input>
        <SubHeading title="Subtasks"></SubHeading>
        {state.subInput.map((sb, index) => {
          return (
            <MultipleInput
              key={index}
              name={sb.title}
              value={sb.title}
              onChange={onChangeSubtasks}
              onRemove={(e) => {
                e.preventDefault();
                dispatch({ type: "DELETE_SUBINPUT", title: sb.title });
              }}
            ></MultipleInput>
          );
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            const subtasks = {
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
          +Add New Subtask
        </button>
        <SubHeading title={"Status"}></SubHeading>
        <Status onChange={onChange} value={state.status}></Status>
        <button
          // onClick={(e) => {
          //   e.preventDefault();
          //   rdxDispatch(
          //     kanbanAction.EditTask({
          //       id: state.id,
          //       title: state.title,
          //       description: state.description,
          //       subtasks: state.subInput,
          //       status: state.status,
          //       colIndex: colIndex,
          //       taskIndex: taskIndex,
          //     })
          //   );
          //   changeToggle();
          //   openModalToggle();
          // }}
          className="bg-mainPurple text-white w-full rounded-full p-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
