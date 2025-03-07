import React from 'react';

const Disclaimer = () => {
  return (
    <div className="flex flex-col rounded-lg items-center justify-center bg-gray-300 dark:bg-gray-800 h-full w-full">
      <div className="max-w-4xl w-full p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Disclaimer</h2>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          The information, services, programs, products, software, and materials available on or through this site may include errors, omissions, or other inaccuracies. You assume the sole risk of making use and/or relying on the information, services, programs, products, software, and materials available on or through this site. We make no representations or warranties about the suitability, completeness, timeliness, reliability, legality, or accuracy of the information, services, programs, products, software, and materials described on or available through this site for any purpose.
        </p>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          The information provided on Grantscraper is for general informational purposes only. The scholarship opportunities and other information provided on Grantscraper are subject to change without notice. It is the responsibility of the users to verify the details, requirements, deadlines, and terms of any scholarship or program before applying. Grantscraper does not guarantee the availability, eligibility, or award of any scholarship listed on the website.
        </p>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          It is important to note that scholarship application processes and decisions are the sole responsibility of the scholarship providers. Grantscraper does not participate in the selection, evaluation, or awarding of scholarships. We provide information and resources to assist users in finding and applying for scholarships but cannot guarantee the outcome of any scholarship application.
        </p>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          We strongly recommend users to independently verify the information provided on the website and directly contact the official scholarship website or relevant institutions for the most accurate and updated details.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Copyright and Content Ownership</h3>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          If we have added any content that belongs to you or your organization by mistake, we apologize for that and assure you that this will not be repeated in the future. If you are the rightful owner of the content used on our website, please email us with your name, organization name, contact details, copyright infringing URL, and copyright proof (URL or legal document) at 
          <a href="mailto:admin@grantscraper.com" className="text-blue-500 hover:underline"> grantscraper@gmail.com</a>.
        </p>

        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-base mb-6 text-center">
          We assure you that we will remove the infringing content within 48 hours.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;