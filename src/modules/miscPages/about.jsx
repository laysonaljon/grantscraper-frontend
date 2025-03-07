import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col rounded-lg items-center justify-center bg-gray-300 dark:bg-gray-800 h-full w-full"> {/* Full height and width of parent */}
      <div className="max-w-4xl w-full p-4 "> {/* Center content with max-width */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">About Us</h2>
        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
            Grantscraper is a scholarship search website that utilizes the power of web scraping to gather scholarships from various sources across the internet to provide the most complete and up-to-date scholarship information to our users.
        </p>
        
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Vision</h3>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base">
            We envision a world where every student, regardless of their economic background, has equal access to educational opportunities. Our aim is to empower individuals and transform communities through accessible education.
          </p>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Mission</h3>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base">
            Our mission is to empower every student by ensuring they have access to the information and resources needed to pursue their educational goals. We strive to create a supportive environment where all students can thrive.
          </p>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Goals</h3>
          <ul className="list-inside text-gray-700 dark:text-gray-400 leading-relaxed text-base">
            <li className="py-1">To empower students by providing them with comprehensive information about available scholarships.</li>
            <li className="py-1">To raise awareness among students about financial aid options that can support their educational journey.</li>
            <li className="py-1">To connect students with resources that help them successfully apply for scholarships and financial aid.</li>
          </ul>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Objectives</h3>
          <ul className="list-inside text-gray-700 dark:text-gray-400 leading-relaxed text-base">
            <li className="py-1">To equip students with the knowledge and tools necessary for effective scholarship applications.</li>
            <li className="py-1">To facilitate partnerships with educational institutions that enhance students' access to scholarships.</li>
            <li className="py-1">To conduct workshops and informational sessions that guide students on navigating scholarship opportunities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;