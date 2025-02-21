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

  useEffect(() => {
    dispatch(actions.getScholarship(scholarshipId));
  }, [dispatch, scholarshipId]);

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
    if (history.length === 1) {
      navigate('/'); // Navigate to home if the previous link is external
    } else {
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
    <div className="w-full mx-auto rounded-lg space-y-6">
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
          <p>
            <strong>Deadline: </strong>
            {scholarship.deadline === 'Ongoing' || scholarship.deadline === 'Passed' 
              ? scholarship.deadline  
              : (() => {
                  const deadlineDate = new Date(scholarship.deadline);
                  const today = new Date();
                  const daysDifference = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                  
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  }).format(deadlineDate);

                  return daysDifference > 0
                    ? `${formattedDate} (${daysDifference} days to go)`
                    : `${formattedDate} (Passed ${Math.abs(daysDifference)} days ago)`;
                })()
            }
          </p>
        </div>
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <p><strong>Type: </strong>{scholarship.type}</p>
        </div>
      </div>

      {/* Description */}
      {scholarship.description && (
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Description</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {scholarship.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br /> {/* Add a line break for each new line */}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Eligibility */}
      {scholarship.eligibility && scholarship.eligibility.length > 0 && (
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Eligibility</h2>
          <ul className="list-disc ml-5">
            {scholarship.eligibility.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                );
              } else if (typeof item === 'object' && item.title && item.items) {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {item.title}
                    <ul className="list-disc ml-5">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-gray-700 dark:text-gray-300">{subItem}</li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {scholarship.benefits && scholarship.benefits.length > 0 && (
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Benefits</h2>
          <ul className="list-disc ml-5">
            {scholarship.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {scholarship.requirements && scholarship.requirements.length > 0 && (
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Requirements</h2>
          <ul className="list-disc ml-5">
            {scholarship.requirements.map((requirement, index) => {
              if (typeof requirement === 'string') {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{requirement}</li>
                );
              } else if (typeof requirement === 'object' && requirement.title && requirement.items) {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {requirement.title}
                    <ul className="list-disc ml-5">
                      {requirement.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-gray-700 dark:text-gray-300">{subItem}</li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}

      {/* Source */}
      {scholarship.source && scholarship.source.link && scholarship.source.site && (
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

          {/* Buttons for Related Links */}
          <div className="mt-4">
            {scholarship.misc && scholarship.misc.length > 0 ? (
              scholarship.misc.map((item, index) => (
                <a
                  key={index} // Unique key for each item
                  href={item.data} // Assuming 'data' holds the URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                  {item.type} {/* Displaying the type as button text */}
                </a>
              ))
            ) : (
              <p>No additional resources available.</p>
            )}
          </div>
        </div>
      )}

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
