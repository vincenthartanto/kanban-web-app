import { createSlice, current } from "@reduxjs/toolkit";
import randomString from "../Function/RandomString";
const initialState = {
  board: [],
  chosenIndex: -1,
};

const KanbanTaskSlice = createSlice({
  name: "Kanban-task-slice",
  initialState,
  reducers: {
    createNewBoard(state, action) {
      state.board.push({
        id: action.payload.id,
        name: action.payload.boardName,
        columns: action.payload.columns,
      });
    },
    createNewTask(state, action) {
      const index = state.chosenIndex;

      const findChosenColumnIndex = state.board[index].columns.findIndex(
        (col) => {
          return col.name === action.payload.status;
        }
      );
      state.board[index].columns[findChosenColumnIndex].tasks.push(
        action.payload
      );
    },
    EditTask(state, action) {
      const colIndex = action.payload.colIndex;
      const taskIndex = action.payload.taskIndex;
      const prevStatus =
        state.board[state.chosenIndex].columns[colIndex].tasks[taskIndex]
          .status;
      const tasks = {
        id: randomString(10),
        title: action.payload.title,
        description: action.payload.description,
        subtasks: action.payload.subtasks,
        status: action.payload.status,
      };
      const chosenColIndex = state.board[state.chosenIndex].columns.findIndex(
        (col) => col.name === tasks.status
      );
      state.board[state.chosenIndex].columns[colIndex].tasks[taskIndex] = {
        ...tasks,
      };
      if (prevStatus !== tasks.status) {
        console.log("masuk");
        state.board[state.chosenIndex].columns[chosenColIndex].tasks.push({
          ...tasks,
        });
        state.board[state.chosenIndex].columns[colIndex].tasks.splice(
          taskIndex,
          1
        );
      }
    },
    EditBoard(state, action) {
      state.board[state.chosenIndex].name = action.payload.boardName;
      state.board[state.chosenIndex].columns = [...action.payload.columns];
    },
    deleteTask(state, action) {
      state.board[state.chosenIndex].columns[
        action.payload.colIndex
      ].tasks.splice(action.payload.taskIndex, 1);
    },
    deleteBoard(state) {
      state.board.splice(state.chosenIndex, 1);
      state.chosenIndex = -1;
    },
    toggleCheckboxTask(state, action) {
      const taskIndex = action.payload.taskIndex;
      const chosenIndex = state.chosenIndex;
      const columnIndex = action.payload.colIndex;
      const subtaskIndex = action.payload.subtaskIndex;
      const value =
        !state.board[chosenIndex].columns[columnIndex].tasks[taskIndex]
          .subtasks[subtaskIndex].isCompleted;
      state.board[chosenIndex].columns[columnIndex].tasks[taskIndex].subtasks[
        subtaskIndex
      ].isCompleted = value;
      console.log(
        "this is the value: " +
          state.board[chosenIndex].columns[columnIndex].tasks[taskIndex]
            .subtasks[subtaskIndex].isCompleted
      );
    },
    moveStatus(state, action) {
      console.log(action.payload);
      const taskIndex = action.payload.taskIndex;
      const columnIndex = action.payload.colIndex;
      const chosenIndex = state.chosenIndex;
      const selectedTask =
        state.board[chosenIndex].columns[columnIndex].tasks[taskIndex];
      const statusName = action.payload.status; // current status
      const chosenColIndex = state.board[chosenIndex].columns.findIndex(
        (col) => col.name === statusName
      );
      if (columnIndex !== chosenColIndex) {
        state.board[chosenIndex].columns[chosenColIndex].tasks.push({
          ...selectedTask,
          status: statusName,
        }); // push to the selected status  ex: from todo to doing

        state.board[chosenIndex].columns[columnIndex].tasks.splice(
          taskIndex,
          1
        );
      }
      // delete the previous task
    },
    moveTask(state, action) {
      // sourceTaskIndex: sourceIndex,
      // sourceTaskDestinationIndex: destination.index,
      // sourceColumnName: source.droppableId,
      // destinationColumnName: destination.droppableId,
      const currentTaskIndex = action.payload.sourceTaskIndex;
      const destinationTaskIndex = action.payload.sourceTaskDestinationIndex;
      const currentColumnName = action.payload.sourceColumnName;
      const destinationColumnName = action.payload.destinationColumnName;
      if (
        destinationColumnName === currentColumnName &&
        currentTaskIndex === destinationTaskIndex
      ) {
        return;
      } else if (destinationColumnName === currentColumnName) {
        const currentColumnIndex = state.board[
          state.chosenIndex
        ].columns.findIndex((col) => col.id === currentColumnName);
        const currentTask =
          state.board[state.chosenIndex].columns[currentColumnIndex].tasks[
            currentTaskIndex
          ];

        state.board[state.chosenIndex].columns[currentColumnIndex].tasks.splice(
          currentTaskIndex,
          1
        );
        state.board[state.chosenIndex].columns[currentColumnIndex].tasks.splice(
          destinationTaskIndex,
          0,
          currentTask
        );
      } else if (destinationColumnName !== currentColumnName) {
        const currentColumnIndex = state.board[
          state.chosenIndex
        ].columns.findIndex((col) => col.id === currentColumnName);
        const destinationColumnIndex = state.board[
          state.chosenIndex
        ].columns.findIndex((col) => col.id === destinationColumnName);

        console.log("current" + currentTaskIndex);
        const currentTask =
          state.board[state.chosenIndex].columns[currentColumnIndex].tasks[
            currentTaskIndex
          ];

        state.board[state.chosenIndex].columns[currentColumnIndex].tasks.splice(
          currentTaskIndex,
          1
        );

        state.board[state.chosenIndex].columns[
          destinationColumnIndex
        ].tasks.splice(destinationTaskIndex, 0, currentTask);

        // state.board[state.chosenIndex].columns[
        //   destinationColumnIndex
        // ].tasks.push({
        //   ...selectedTask,
        //   status: statusName,
        // }); // push to the selected status  ex: from todo to doing

        // state.board[state.chosenIndex].columns[currentColumnIndex].tasks.splice(
        //   currentTaskIndex,
        //   1
        // );
      }
    },
    chooseBoard(state, action) {
      const findIndex = state.board.findIndex(
        (board) => action.payload.name === board.name
      );
      state.chosenIndex = findIndex;

      // state.chosenBoard = {
      //   ...state.board[findIndex],
      //   index: findIndex,
      // };
    },
  },
});

export default KanbanTaskSlice;
export const KanbanTaskSliceAction = KanbanTaskSlice.actions;

/*
Structure :
  board: [
    {
      ToDoTask: [
        {
          title: "blablbalb",
          subtasks\: [1, 2, 3],
        },
      ],
    },
  ],
*/
