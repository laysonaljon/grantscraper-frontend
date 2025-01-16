import React from 'react';

const Toast = ({ message, type, onClose }) => {
  const toastStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-lg ${toastStyles[type]} text-white z-50`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 focus:outline-none">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
