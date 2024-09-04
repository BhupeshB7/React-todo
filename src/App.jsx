import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="grid grid-cols-1 bg-zinc-800 rounded-lg shadow-lg w-[99%] md:w-[80%]">
        <div className="md:col-span-1 w-full">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
