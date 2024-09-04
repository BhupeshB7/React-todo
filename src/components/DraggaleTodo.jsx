import React from "react";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

const DraggableTodo = ({ todo, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 rounded-lg flex justify-between items-center ${
        todo.completed ? "bg-zinc-600 line-through text-gray-500" : "bg-zinc-700"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <span>{todo.text}</span>
      <div className="flex gap-2">
        <FaEdit
          className="m-1 text-gray-400"
          onClick={() => onEdit(todo)}
          size={20}
        />
        <FaTrash
          className="m-1 text-red-400"
          size={20}
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </div>
  );
};

export default DraggableTodo;
