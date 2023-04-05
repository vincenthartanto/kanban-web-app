import { configureStore } from "@reduxjs/toolkit";
import KanbanTaskSlice from "./KanbanTaskSlice";
export const store = configureStore({
  reducer: {
    kanban: KanbanTaskSlice.reducer,
  },
});
