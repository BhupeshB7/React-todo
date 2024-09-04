import { createSlice, nanoid } from "@reduxjs/toolkit";

// Utility function to get the current date
const getCurrentDate = () => new Date().toISOString().slice(0, 10);

// Utility function to get the saved data from localStorage
const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem("todoState");
  if (storedState) {
    const parsedState = JSON.parse(storedState);
    const { lastSavedDate } = parsedState;
    // Check if the saved data is older than 7 days
    if (new Date().getTime() - new Date(lastSavedDate).getTime() > 7 * 24 * 60 * 60 * 1000) {
      // Data is older than 7 days, clear it
      localStorage.removeItem("todoState");
      return { todos: [], filter: "All", searchTerm: "" };
    }
    return parsedState;
  }
  return { todos: [], filter: "All", searchTerm: "" };
};

// Utility function to save the state to localStorage
const saveStateToLocalStorage = (state) => {
  const stateToSave = { ...state, lastSavedDate: getCurrentDate() };
  localStorage.setItem("todoState", JSON.stringify(stateToSave));
};

const initialState = loadStateFromLocalStorage();

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate || null,
        priority: action.payload.priority || "Medium",
      };
      state.todos.push(todo);
      saveStateToLocalStorage(state);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    editTodo: (state, action) => {
      const { id, newText, newDueDate, newPriority } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText || todo.text;
        todo.dueDate = newDueDate || todo.dueDate;
        todo.priority = newPriority || todo.priority;
        saveStateToLocalStorage(state);
      }
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveStateToLocalStorage(state);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveStateToLocalStorage(state);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      saveStateToLocalStorage(state);
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  toggleComplete,
  setFilter,
  setSearchTerm,
} = todoSlice.actions;
export default todoSlice.reducer;
