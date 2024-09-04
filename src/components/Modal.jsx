import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg relative min-w-[90%] md:min-w-[800px] ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-3xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
