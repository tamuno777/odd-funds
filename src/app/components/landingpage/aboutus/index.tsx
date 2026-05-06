import React from 'react';
import PrimaryLink from '../../Link';
import AppHeading from '../../Heading';
import TextHighlight from '../../TextHighlight';

const Aboutsection = () => {
  return (
    <div className='w-full'>
      <section className="bg-white py-16 px-16 flex items-center justify-between flex-col md:flex-row">
        <div className=" w-full md:w-1/2 mb-8 max-h-[70%] md:mb-0 flex justify-center lg:justify-start">
          <img
            src="/about.jpg"
            alt="Fundraising Image"
            className="w-[70%] h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <AppHeading as="h2" variant="dark">
            About <TextHighlight variant="primary">Us</TextHighlight>
          </AppHeading>
          <p className="text-mdleading-relaxed  text-gray-700 mb-8">
            At <span className="font-semibold ">ODDFUND</span>, we believe in the power of community and the impact of collective giving. Our platform is designed to help individuals, organizations, and causes raise funds for important initiatives. Whether you’re looking to support a local charity, fund a creative project, or provide assistance to those in need, FundMe makes it simple, transparent, and engaging.
          </p>
          <p className="text-mdleading-relaxed text-gray-700 mb-8">
            We empower users to create fundraising campaigns in just a few easy steps, donate to causes they care about, and track the progress of campaigns they support. Our mission is to create a world where anyone, anywhere, can make a meaningful difference.
          </p>
          <div className="flex gap-4 flex-col lg:flex-row ">
            <PrimaryLink href="#explore" variant="primary">
              Join the Movement
            </PrimaryLink>

            <PrimaryLink href="/services" variant="secondary">
              Explore Our Services
            </PrimaryLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutsection;
