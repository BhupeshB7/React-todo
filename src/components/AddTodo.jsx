import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todo/todoSlice";
import toast from "react-hot-toast";

const AddTodo = ({ onClose }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length < 3) {
      toast.error("Todo length must be greater than 3");
      return;
    }

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("Todo Reminder", {
          body: `Your Todo added : ${text}`,
          icon: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png", // Optional
        });
      }
    }, 1000);

    dispatch(addTodo({ text, dueDate, priority }));
    toast.success("Todo added successfully");
    setText("");
    setDueDate("");
    setPriority("Medium");
    if (onClose) onClose(); // Close the modal
  };

  return (
    <div className="flex items-center justify-center max-h-[100%] m-3 rounded">
      <div className="w-full max-w-xl mt-3">
        <form className="bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="todo"
            >
              Todo
            </label>
            <input
              className="shadow border border-gray-700 rounded w-full py-2 px-3 bg-zinc-900 text-gray-400"
              id="todo"
              type="text"
              placeholder="Todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              className="shadow border border-gray-700 rounded w-full py-2 px-3 bg-zinc-900 text-gray-400"
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              id="priority"
              className="shadow border border-gray-700 rounded w-full py-2 px-3 bg-zinc-900 text-gray-400"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
