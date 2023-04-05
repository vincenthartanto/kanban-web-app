import React, { useContext } from "react";
import Input from "../Input";
import SubHeading from "../SubHeading";
import MultipleInput from "../Task/MultipleInput";
import { DarkModeContext } from "../../Context/DarkModeProvider";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../Hooks/UseForm";
import { KanbanTaskSliceAction } from "../../Store/KanbanTaskSlice";
import randomString from "../../Function/RandomString";

export default function EditNewBoard({ changeToggle }) {
  const themeCtx = useContext(DarkModeContext);
  const chosenIndex = useSelector((state) => state.kanban.chosenIndex);
  const chosenBoard = useSelector((state) => state.kanban.board[chosenIndex]);
  const rdxDispatch = useDispatch();
  const kanbanAction = KanbanTaskSliceAction;
  const { state, dispatch } = useForm({
    boardName: chosenBoard.name,
    columns: chosenBoard.columns,
  });
  function onChange(e) {
    const action = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT", input: action });
  }
  function onChangeColumn(e) {
    const action = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch({ type: "INPUT_COLUMN", input: action });
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        themeCtx.theme === "light" ? "bg-white" : "bg-darkGrey"
      } min-h-[40%] w-[90%] rounded-xl p-8 space-y-4 md:w-[50%] md:min-h-[40%] `}
    >
      <h1
        className={`font-bold ${
          themeCtx.theme === "light" ? "text-black" : "text-white"
        } `}
      >
        Edit Board
      </h1>
      <form
        onSubmit={() => {
          rdxDispatch(
            kanbanAction.EditBoard({
              boardName: state.boardName,
              columns: state.columns,
            })
          );
          changeToggle();
        }}
        className="space-y-4"
      >
        <Input
          labelName={"Board Name"}
          name={"BoardName"}
          value={state.boardName}
          onChange={onChange}
          placeholder={"e.g. Web Design"}
        ></Input>
        <SubHeading title={"Board Name"}></SubHeading>
        {state.columns.map((col, index) => {
          return (
            <MultipleInput
              key={index}
              name={col.name}
              value={col.name}
              onChange={onChangeColumn}
              onRemove={(e) => {
                e.preventDefault();
                dispatch({ type: "DELETE_SUBINPUT_BOARD", id: col.id });
              }}
            ></MultipleInput>
          );
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            const columns = {
              id: randomString(10),
              name: "",
              tasks: [],
            };
            dispatch({ type: "ADD_COLUMN", columns: columns });
          }}
          className={` text-mainPurple font-medium w-full rounded-full p-4 ${
            themeCtx.theme === "light"
              ? "bg-mainPurple bg-opacity-10"
              : "bg-white"
          }`}
        >
          +Add New Column
        </button>
        <button
          // onClick={(e) => {
          //   e.preventDefault();
          //   rdxDispatch(
          //     kanbanAction.EditBoard({
          //       boardName: state.boardName,
          //       columns: state.columns,
          //     })
          //   );
          //   changeToggle();
          // }}
          className="bg-mainPurple text-white w-full rounded-full p-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
