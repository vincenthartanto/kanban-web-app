import React, { useContext, useReducer } from "react";
import Input from "../Input";
import SubHeading from "../SubHeading";
import MultipleInput from "../Task/MultipleInput";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import useForm from "../../Hooks/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
import randomString from "../../Function/RandomString";
export default function AddNewBoard({ changeToggle }) {
  const themeContext = useContext(DarkModeContext);
  const rdxDispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const { state, dispatch } = useForm({
    id: randomString(10),
    boardName: "",
    columns: [
      {
        id: randomString(10),
        name: "",
        tasks: [],
      },
    ],
  });
  function onChangeColumn(e) {
    const input = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT_COLUMN", input: input });
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
        themeContext.theme === "light" ? "bg-white" : "bg-darkGrey text-white"
      } min-h-[80%] w-[90%]  rounded-xl p-8 space-y-4 md:w-[50%] md:min-h-[40%] `}
    >
      <h1 className="font-bold">Add New Board</h1>
      <form
        onSubmit={() => {
          rdxDispatch(kanbanAction.createNewBoard(state));
          changeToggle();
        }}
        className="space-y-4"
      >
        <Input
          labelName={"Board Name"}
          name={"BoardName"}
          placeholder={"e.g. Web Design"}
          onChange={onChange}
          value={state.boardName}
        ></Input>
        <SubHeading title={"Board Columns"}></SubHeading>

        {state.columns.map((sb) => {
          return (
            <MultipleInput
              key={sb.id}
              name={sb.name}
              value={sb.name}
              onChange={onChangeColumn}
              onRemove={(e) => {
                e.preventDefault();
                dispatch({ type: "DELETE_COLUMN", name: sb.name });
              }}
            ></MultipleInput>
          );
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            const column = {
              id: randomString(10),
              name: "",
              tasks: [],
            };
            dispatch({ type: "ADD_COLUMN", columns: column });
          }}
          className={`${
            themeContext.theme === "light"
              ? "bg-mainPurple bg-opacity-10"
              : "bg-white"
          } text-mainPurple font-medium w-full rounded-full p-4`}
        >
          +Add New Column
        </button>
        <button
          // onClick={(e) => {
          //   e.preventDefault();
          //   rdxDispatch(kanbanAction.createNewBoard(state));
          //   changeToggle();
          // }}
          className="bg-mainPurple text-white w-full rounded-full p-4"
        >
          Create New Board
        </button>
      </form>
    </div>
  );
}
