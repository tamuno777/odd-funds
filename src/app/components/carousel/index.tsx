"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    ltr: true, // Enables right-to-left scrolling
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-3 z-10 flex flex-col items-center">
        {dots}
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-yellow-400 transition"></button>
    ),
  };

  return (
    <div className="relative w-full lg:h-screen bg-customPrimary">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between lg:h-screen p-8 lg:p-16 bg-customPrimary text-customwhite">
            {/* Text Section */}
            <div className="lg:w-1/2 md:w-1/2 w-full text-center lg:text-left md:text-left ">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Support Your{" "}
              </h1>
              <p className="text-2xl lg:text-3xl font-bold mb-6">
                Make{" "}
                <span className="text-custombutton"> Favorite Causes </span>{" "}
                <br />
                Create, donate, and track campaigns to make a real impact!
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button className="bg-custombutton px-6 py-3 rounded-lg text-white font-semibold">
                Start a Campaign                </button>
                <button className="border  border-custombutton bg-transparent text-customtext px-6 py-3 rounded-lg font-semibold">
                  About Us
                </button>
              </div>
            </div>
            {/* Image Section */}
            <div className="lg:w-1/2 w-full md:w-1/2 flex  lg:justify-end justify-center my-6 lg:my-0 ">
              <img
                src="/hero1.jpg"
                alt="Helping Hands"
                className=" rounded-lg shadow-lg object-cover lg:w-[50%] md:w-[50%]  h-[50%]"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between lg:h-screen p-8 lg:p-16 bg-customPrimary text-customwhite">
            {/* Text Section */}
            <div className="lg:w-1/2 md:w-1/2 w-full text-center lg:text-left md:text-left ">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                How You Could Help!!
              </h1>
              <p className="text-2xl lg:text-3xl font-bold mb-6">
                Make <span className="text-custombutton">someone’s life</span>{" "}
                by giving of your hands
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button className="bg-custombutton px-6 py-3 rounded-lg text-white font-semibold">
                  About us
                </button>
                <button className="border  border-custombutton bg-transparent text-customtext px-6 py-3 rounded-lg font-semibold">
                  Support Us
                </button>
              </div>
            </div>
            {/* Image Section */}
            <div className="lg:w-1/2 w-full md:w-1/2 flex  lg:justify-end justify-center my-6 lg:my-0 ">
              <img
                src="/hero1.jpg"
                alt="Helping Hands"
                className=" rounded-lg shadow-lg object-cover lg:w-[50%] md:w-[50%]  h-[50%]"
              />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <div className="flex flex-col md:flex-row  lg:flex-row items-center justify-between lg:h-screen p-8 lg:p-16 bg-customPrimary text-customwhite">
            {/* Text Section */}
            <div className="lg:w-1/2 md:w-1/2 w-full text-center lg:text-left md:text-left ">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Join Our Mission!
              </h1>
              <p className="text-2xl lg:text-3xl font-bold mb-6">
                Spread <span className="text-custombutton">kindness</span> to
                create a better world
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button className="bg-custombutton px-6 py-3 rounded-lg text-white font-semibold">
                  Get Involved
                </button>
                <button className="border  border-custombutton bg-transparent text-customtext px-6 py-3 rounded-lg font-semibold">
                  Contact Us
                </button>
              </div>
            </div>
            {/* Image Section */}
            <div className="lg:w-1/2 w-full md:w-1/2 flex  lg:justify-end justify-center my-6 lg:my-0 ">
              <img
                src="/hero1.jpg"
                alt="Helping Hands"
                className=" rounded-lg shadow-lg object-cover lg:w-[50%] md:w-[50%]  h-[50%]"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroCarousel;
