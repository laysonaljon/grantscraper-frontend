import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from '../scholarship_actions';
import Modal from './modal';

const ScholarshipDetails = () => {
  const dispatch = useDispatch();
  const { scholarshipId } = useParams();
  const scholarship = useSelector((state) => state.scholarships.scholarship);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.getScholarship(scholarshipId));
  }, [dispatch, scholarshipId]);

  if (!scholarship) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubscribe = (email) => {
    dispatch(actions.addUserPreference(email, scholarship.level, scholarship.type, scholarshipId));
    handleCloseModal(); // Close the modal after subscription
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Scholarship Details</h1>

      {/* Scholarship Information in Separate Bento Boxes */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
        <p><strong>Name:</strong> {scholarship.name}</p>
      </div>
     
      {/* Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Level:</strong> {scholarship.level}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Deadline:</strong> 
            { new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(scholarship.deadline))}
          </p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Type:</strong> {scholarship.type}</p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Eligibility</h2>
        <ul className="list-disc ml-5">
          {scholarship.eligibility.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Benefits</h2>
        <ul className="list-disc ml-5">
          {scholarship.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Requirements</h2>
        <ul className="list-disc ml-5">
          {scholarship.requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Source */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Source</h2>
        <p>
          <a
            href={scholarship.source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {scholarship.source.site}
          </a>
        </p>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleOpenModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Open Modal
      </button>

      {/* Subscription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default ScholarshipDetails;
