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
    return <p>Loading...</p>;
  }

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubscribe = (email) => {
    dispatch(actions.addUserPreference(email, scholarship.level, scholarship.type, scholarshipId));
    handleCloseModal();  // Close the modal after subscription
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scholarship Details</h1>
      <p><strong>Name:</strong> {scholarship.name}</p>
      <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {scholarship.type}</p>
      <p><strong>Level:</strong> {scholarship.level}</p>

      <h2 className="text-xl font-semibold mt-4">Eligibility</h2>
      <ul className="list-disc ml-5">
        {scholarship.eligibility.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Benefits</h2>
      <ul className="list-disc ml-5">
        {scholarship.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Requirements</h2>
      <ul className="list-disc ml-5">
        {scholarship.requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Source</h2>
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

      <button
        onClick={handleOpenModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default ScholarshipDetails;
