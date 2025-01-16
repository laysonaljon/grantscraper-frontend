import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubscribe, loading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      onSubscribe(email);
      setEmail('');
      onClose();
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
      <div className="w-104 rounded-lg shadow-lg bg-white text-gray-800 max-w-md dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Subscribe for Updates</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-base font-semibold text-center">
            Subscribe to receive this scholarship in your inbox and stay updated with similar opportunities!
          </p>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {error && (
              <div className="text-red-500 text-sm mt-2" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
          </div>
        </div>
        <div className="px-6 mb-4">
          <button
            onClick={handleSubscribe}
            className={`w-full px-6 py-3 rounded flex items-center justify-center ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : !email.trim() || error
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
            }`}
            disabled={loading || !email.trim() || error}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
