import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      onSubscribe(email);
      setEmail(''); // Clear the input field after subscription
      onClose(); // Close the modal after subscription
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Validate email on change
    if (newEmail && !validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
    } else {
      setError(''); // Clear error if valid
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="px-4 py-2 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Subscribe for Updates</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <p>Subscribe to updates for this scholarship.</p>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange} // Use the new handler
            placeholder="Enter your email"
            className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <div className="text-red-500 mb-2" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-end px-4 py-2 border-t">
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            disabled={!email.trim() || error} // Disable button if email is empty or invalid
          >
            Subscribe
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
