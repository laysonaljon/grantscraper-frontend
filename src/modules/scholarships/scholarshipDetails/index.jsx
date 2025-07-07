import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import actions from '../scholarship_actions';
import Modal from './modal';
import Toast from '../../../components/toast';
import Loading from '../../../components/loading';

const ScholarshipDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scholarshipId } = useParams();
  const scholarship = useSelector((state) => state.scholarships.scholarship);
  const message = useSelector((state) => state.scholarships.message);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  function processRequirementText(text) {
    // Regex to extract only the href and link text from an anchor tag
    const linkRegex = /<a\s+href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi;
    const parts = [];
    let lastIndex = 0;

    // Extract all anchor tags and remove unwanted attributes
    text.replace(linkRegex, (match, url, linkText, offset) => {
      parts.push(text.substring(lastIndex, offset)); // Add text before the link
      parts.push(
        <a
          key={offset}
          href={url} // Ensuring only the href is included
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          {linkText}
        </a>
      );
      lastIndex = offset + match.length;
    });

    parts.push(text.substring(lastIndex)); // Add any remaining text after the last link
    return parts;
  }

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching new scholarship details
    dispatch(actions.getScholarship(scholarshipId));
  }, [dispatch, scholarshipId]);

  useEffect(() => {
    if (scholarship) {
      setLoading(false); // Set loading to false once scholarship data is available
    }
  }, [scholarship]);

  useEffect(() => {
    if (message && message.message !== '') {
      setLoading(false); // Also stop loading if a message (success/error) comes through
      setToastVisible(true);

      if (message.type === 'success') {
        setModalOpen(false);
      }

      const timer = setTimeout(() => {
        setToastVisible(false);
        dispatch(actions.clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]); // Added dispatch to dependency array

  if (loading) {
    return <Loading />; // Render the Loading component when loading is true
  }

  // If scholarship is null after loading (e.g., ID not found), display a message
  if (!scholarship) {
    return <p className="text-center text-gray-500">Scholarship not found.</p>;
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
    setLoading(true); // Set loading to true when subscribing
    try {
      dispatch(actions.addUserPreference(email, scholarship.level, scholarship.type, scholarshipId));
      // handleCloseModal is handled by the useEffect for messages
    } catch (error) {
      console.error("Subscription failed:", error);
      setLoading(false); // Ensure loading is stopped even on error
    }
  };

  return (
    <div className="w-full mx-auto rounded-lg space-y-4">
      {/* Main header div - contains title and desktop-specific buttons */}
      {/* On desktop (lg and up), buttons are justified between. On smaller, title is centered. */}
      <div className="flex sm:justify-center md:justify-center lg:justify-between items-center p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
        {/* Back button for desktop (visible only on lg and up) */}
        <button
          onClick={handleBackToTable}
          className="hidden lg:block mt-0 px-4 py-2 min-w-48 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        >
          <span>◄ Back</span>
        </button>

        {/* Scholarship Name (always visible, centered on small and medium screens) */}
        <h2 className="text-2xl text-center font-bold text-gray-800 dark:text-white flex-grow md:flex-grow-0">
          {scholarship.name}
        </h2>

        {/* Favorite button for desktop (visible only on lg and up) */}
        <button
          onClick={handleOpenModal}
          className="hidden lg:block ml-10 mt-0 px-4 py-2 min-w-48 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
        >
          <span>♥ Favorite</span>
        </button>
      </div>

      {/* Container for Tablet and Mobile buttons - hidden on large screens (lg and up) */}
      <div className="flex justify-center gap-x-1 lg:hidden">
        {/* Back button for Tablet (md) - shows text, half width */}
        <button
          onClick={handleBackToTable}
          className="hidden sm:hidden md:block w-1/2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md text-lg"
          aria-label="Back"
        >
          <span>◄ Back</span>
        </button>

        {/* Favorite button for Tablet (md) - shows text, half width */}
        <button
          onClick={handleOpenModal}
          className="hidden sm:hidden md:block w-1/2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md text-lg"
          aria-label="Favorite"
        >
          <span>♥ Favorite</span>
        </button>

        {/* Back button for Mobile (sm and below) - shows icon, half width */}
        <button
          onClick={handleBackToTable}
          className="block md:hidden w-1/2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md text-xl"
          aria-label="Back"
        >
          <span>◄</span>
        </button>

        {/* Favorite button for Mobile (sm and below) - shows icon, half width */}
        <button
          onClick={handleOpenModal}
          className="block md:hidden w-1/2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md text-xl"
          aria-label="Favorite"
        >
          <span>♥</span>
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

                  if (daysDifference > 0) {
                      return daysDifference === 1
                        ? `${formattedDate} (${daysDifference} day to go)`
                        : `${formattedDate} (${daysDifference} days to go)`;
                  } else {
                      return Math.abs(daysDifference) === 1
                        ? `${formattedDate} (Passed ${Math.abs(daysDifference)} day ago)`
                        : `${formattedDate} (Passed ${Math.abs(daysDifference)} days ago)`;
                  }
                })()}
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
              // Handle object-based requirements (title + items)
              if (typeof requirement === "object" && requirement.title && requirement.items) {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {requirement.title}
                    <ul className="list-disc ml-5">
                      {requirement.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-gray-700 dark:text-gray-300">
                          {processRequirementText(subItem)}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // Ensure requirement is a string before processing
              if (typeof requirement !== "string") {
                return <li key={index} className="text-gray-700 dark:text-gray-300">{String(requirement)}</li>;
              }

              return <li key={index} className="text-gray-700 dark:text-gray-300">{processRequirementText(requirement)}</li>;
            })}
          </ul>
        </div>
      )}

      {/* Related Links */}
      {scholarship.source && scholarship.source.link && scholarship.source.site && (
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Related Links</h2>
          <div className="flex flex-wrap justify-start mt-2">
            <a
              href={scholarship.source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block mb-2 mx-2 px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition duration-200"
              >
              Source: {scholarship.source.site}
            </a>
            {scholarship.misc && scholarship.misc.length > 0 && (
              scholarship.misc.map((item, index) => {
                if (item.data && item.type) {
                  return (
                    <a
                    key={index}
                    href={item.data}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-block mb-2 mx-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    {item.type}
                  </a>
                  );
                }
                return null; // Don't render anything if data or type is missing
              })
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