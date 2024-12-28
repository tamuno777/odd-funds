import Link from 'next/link';
import React from 'react';

const Aboutsection = () => {
  return (
    <div className='w-full'>
      <section className="bg-gray-50 py-16 px-16 flex items-center justify-between flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className=" w-full md:w-1/2 mb-8 max-h-[70%] md:mb-0 flex justify-center lg:justify-start">
          <img 
            src="/about.jpg" 
            alt="Fundraising Image" 
            className="w-[70%] h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">About Us</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            At <span className="font-bold text-customPrimary">FundMe</span>, we believe in the power of community and the impact of collective giving. Our platform is designed to help individuals, organizations, and causes raise funds for important initiatives. Whether you’re looking to support a local charity, fund a creative project, or provide assistance to those in need, FundMe makes it simple, transparent, and engaging.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            We empower users to create fundraising campaigns in just a few easy steps, donate to causes they care about, and track the progress of campaigns they support. Our mission is to create a world where anyone, anywhere, can make a meaningful difference.
          </p>
        <div className="flex">
        <a href="#explore"
         className="bg-custombutton text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300">
            Join the Movement
          </a>
          <Link
          href="/services"
          className="underline text-custombutton py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300">

        
          Explore Our Services
        </Link>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutsection;
