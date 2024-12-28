import React from 'react';

const Createsection = () => {
  return (
    <div className='w-full'>
      <section className="bg-white py-16 px-16 flex items-center justify-between flex-col md:flex-row">
        {/* Left Side - Image */}
        
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Start Your Own Campaign</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            It’s easy to create a <span className="font-bold text-customPrimary">campaign and start fundraising.</span>
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Your cause can make a difference. We empower users to create fundraising campaigns in just a few easy steps, donate to causes they care about, and track the progress of campaigns they support.
          </p>

          {/* Steps */}
          <div className="text-left mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h3>
            <ul className="list-decimal pl-6 text-lg text-gray-700">
              <li className="mb-2">Choose a cause you are <span className="font-bold text-customPrimary">passionate</span>  about.</li>
              <li className="mb-2">Create your <span className="font-bold text-customPrimary">campaign page </span> with a compelling story.</li>
              <li className="mb-2">Set a <span className="font-bold text-customPrimary">funding goal and timeline </span>  for your campaign.</li>
              <li className="mb-2">Share your campaign with friends, family, and social media.<span className="font-bold text-customPrimary">friends, family, </span>and<span className="font-bold text-customPrimary"> social media. </span> </li>
              <li className="mb-2">Track your campaign’s <span className="font-bold text-customPrimary">  progress  </span>and<span className="font-bold text-customPrimary">  engage </span> with donors.</li>
            </ul>
          </div>

          <div className="flex">
            <a href="#explore"
              className="bg-custombutton text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300">
              Create Your Campaign
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 mb-8 max-h-[70%] md:mb-0 flex justify-center lg:justify-end">
          <img 
            src="/about.jpg" 
            alt="Fundraising Image" 
            className="w-[70%] h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Side - Text */}
      </section>
    </div>
  );
};

export default Createsection;
