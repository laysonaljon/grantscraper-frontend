import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import actions from '../scholarship_actions';
import Modal from './modal';
import Toast from '../../../components/toast';

const ScholarshipDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scholarshipId } = useParams();
  const scholarship = useSelector((state) => state.scholarships.scholarship);
  const message = useSelector((state) => state.scholarships.message);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevUrl, setPrevUrl] = useState(''); // State for previous URL
  const webUrl = import.meta.env.VITE_WEB_URL.toLowerCase();

  // Fetch scholarship details when component mounts
  useEffect(() => {
    dispatch(actions.getScholarship(scholarshipId));
    
    // Get the previous URL from document.referrer
    setPrevUrl(document.referrer);
  }, [dispatch, scholarshipId]);

  // Handle message changes to update UI
  useEffect(() => {
    if (message && message.message !== '') {
      setLoading(false);
      setToastVisible(true);

      if (message.type === 'success') {
        setModalOpen(false);
      }

      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!scholarship) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleBackToTable = () => {
    const isExternalLink = prevUrl && !prevUrl.startsWith(webUrl);

    if (isExternalLink) {
      console.log("Navigating to home because previous link is external:", document);
      navigate('/'); // Navigate to home if the previous link is external
    } else {
      console.log("Navigating back to previous page:", history);
      navigate(-1); // Navigate back to the previous page
    }
  };

  const handleSubscribe = async (email) => {
    setLoading(true); // Set loading to true on submit
    try {
      dispatch(actions.addUserPreference(email, scholarship.level, scholarship.type, scholarshipId));
    } catch (error) {
      console.error("Subscription failed:", error); // Handle any errors here
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg space-y-6">
      {/* Scholarship Information */}
      <div className="flex justify-between items-center p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
        <button
          onClick={handleBackToTable}
          className="mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          ◄ Back to Table
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{scholarship.name}</h2>
        <button
          onClick={handleOpenModal}
          className="mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          ♥ Add to Favorite
        </button>
      </div>

      {/* Level, Deadline, Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Level: </strong>{scholarship.level}</p>
        </div>
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Deadline: </strong> 
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(scholarship.deadline))}
          </p>
        </div>
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Type: </strong>{scholarship.type}</p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Eligibility</h2>
        <ul className="list-disc ml-5">
          {scholarship.eligibility.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Benefits</h2>
        <ul className="list-disc ml-5">
          {scholarship.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Requirements</h2>
        <ul className="list-disc ml-5">
          {scholarship.requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Source */}
      <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
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

      {/* Subscription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubscribe={handleSubscribe}
        loading={loading} // Pass loading state to Modal
      />

      {/* Toast Notification */}
      {isToastVisible && (
        <Toast 
          message={message.message} 
          type={message.type} 
          onClose={() => setToastVisible(false)} 
        />
      )}
    </div>
  );
};

export default ScholarshipDetails;
