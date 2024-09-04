import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleComplete,
  removeTodo,
  editTodo,
  setFilter,
  setSearchTerm,
} from "../store/todo/todoSlice";
import toast from "react-hot-toast";
import AddTodo from "./AddTodo";
import Modal from "./Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const searchTerm = useSelector((state) => state.searchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "All") return true;
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      return false;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDeleteTodo = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirm) return;
    dispatch(removeTodo(id));
    toast.success("Todo removed successfully");
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-zinc-900 rounded-lg shadow-md m-3">
      <h2 className="text-2xl font-bold text-white mb-4">Todo List</h2>
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-2 md:gap-6">
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 p-2 w-full min-w-[300px] bg-zinc-800 text-white rounded"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <select
          onChange={(e) => dispatch(setFilter(e.target.value))}
          value={filter}
          className="mb-4 p-2 w-full bg-zinc-800 text-white rounded"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={() => {
            setEditTodoId(null);
            setIsModalOpen(true);
          }}
          className="bg-green-400 hover:bg-green-500 text-green-950 min-w-[150px] px-4 py-2 rounded-lg shadow-md mb-4"
        >
          Add Todo
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-zinc-800 text-white">
          <thead>
            <tr className="w-full border-b border-gray-700">
              <th className="py-2 px-4 text-left">Todo</th>
              <th className="py-2 px-4 text-left">Priority</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Completed</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  Sorry, no todos found
                </td>
              </tr>
            ) : (
              filteredTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className="hover:bg-gray-700 transition-colors duration-300"
                >
                  <td
                    className={`py-2 px-4 ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      todo.priority === "Low"
                        ? "text-red-500"
                        : todo.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {todo.priority}
                  </td>
                  <td className="py-2 px-4 ">{todo.dueDate}</td>
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleComplete(todo.id))}
                      className="form-checkbox p-2 w-5 h-5"
                    />
                  </td>

                  <td className="py-2 px-4 flex flex-row items-center gap-2">
                    <FaEdit
                      className="m-1 text-gray-400"
                      onClick={() => handleEditTodo(todo)}
                      
                      size={20}
                    />
                    <FaTrash
                      className="m-1 text-red-400"
                      size={20}
                      onClick={() => handleDeleteTodo(todo.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTodo
          onClose={() => setIsModalOpen(false)}
          editTodoId={editTodoId}
        />
      </Modal>
    </div>
  );
};

export default TodoList;











