import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../store/todo/todoSlice";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
import "antd/dist/reset.css";
const AddTodo = ({ onClose, editTodoId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const todoToEdit = todos.find((todo) => todo.id === editTodoId);

  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
      setDueDate(todoToEdit.dueDate ? moment(todoToEdit.dueDate) : null);
      setPriority(todoToEdit.priority);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length < 3) {
      toast.error("Todo length must be greater than 3");
      return;
    }

    const formattedDate = dueDate ? dueDate.format("MM/DD/YYYY") : "";

    if (editTodoId) {
      dispatch(
        editTodo({
          id: editTodoId,
          newText: text,
          newDueDate: formattedDate,
          newPriority: priority,
        })
      );
      toast.success("Todo updated successfully");
    } else {
      dispatch(addTodo({ text, dueDate: formattedDate, priority }));
      toast.success("Todo added successfully");
    }

    setText("");
    setDueDate(null);
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
              className="shadow border border-gray-700 rounded focus:ring-[2px] focus:ring-green-400 focus:outline-none w-full py-2 px-3 bg-zinc-900 text-gray-400"
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
              <DatePicker
                id="dueDate"
                value={dueDate}
                onChange={(date) => setDueDate(date)}
                format="MM/DD/YYYY"
                className="shadow border hover:bg-zinc-900  border-gray-700 rounded focus:ring-[2px] focus:ring-green-400 focus:outline-none w-full py-2 px-3 bg-zinc-900 text-gray-400"
            
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
              className="shadow border border-gray-700 rounded w-full py-2 px-3 bg-zinc-900 text-gray-400"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              {editTodoId ? "Update Todo" : "Add Todo"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
