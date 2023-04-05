import React from "react";
import { useReducer } from "react";
export default function useForm(initialState) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_SUBINPUT": {
        return { ...state, subInput: [...state.subInput, action.subInput] };
      }
      case "ADD_COLUMN": {
        return { ...state, columns: [...state.columns, action.columns] };
      }
      case "DELETE_SUBINPUT": {
        const subInput = state.subInput.filter(
          (sb) => sb.title !== action.title
        );
        return { ...state, subInput: subInput };
      }
      case "DELETE_SUBINPUT_BOARD": {
        const columns = state.columns.filter((col) => col.id !== action.id);
        return { ...state, columns: columns };
      }
      case "INPUT_COLUMN": {
        const input = action.input;
        const stateColumns = [...state.columns]; // Because of this
        const selectedColumns = state.columns.find(
          (col) => col.name === input.name
        );
        const selectedColumnsIndex = state.columns.findIndex(
          (col) => col.name === input.name
        );

        stateColumns[selectedColumnsIndex] = {
          ...selectedColumns,
          name: input.value,
        };
        return { ...state, columns: stateColumns };
      }
      case "INPUT": {
        const input = action.input;
        if (input.type === "subtasks") {
          const subInputs = [...state.subInput];
          const selectedSubInput = state.subInput.find(
            (sb) => sb.title === input.name
          );
          const selectedSubInputIndex = state.subInput.findIndex(
            (sb) => sb.title === input.name
          );
          let data;

          data = {
            ...selectedSubInput,
            title: input.value,
          };

          subInputs[selectedSubInputIndex] = {
            ...data,
          };
          return { ...state, subInput: subInputs };
        } else {
          if (input.name === "Title") {
            return { ...state, title: action.input.value };
          } else if (input.name === "Description") {
            return { ...state, description: action.input.value };
          } else if (input.name === "status") {
            console.log(action.input.value);
            return { ...state, status: action.input.value };
          } else if (input.name === "BoardName") {
            return { ...state, boardName: action.input.value };
          }
        }
      }

      default:
        return;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
