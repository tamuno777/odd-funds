import React from "react";
import { GiFamilyHouse, GiWorld } from "react-icons/gi";
import StatsSection from "./countdown";

const About = () => {
  return (
    <div className="w-full " style={{ minHeight: "70vh" }}>
      <section>
        <div
          className="relative w-full h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/aboutBanner.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Text */}
          <div className=" absolute inset-0 flex flex-col items-left justify-center text-left px-8 lg:pl-60">
            <p className="text-lg md:text-xl text-white ">
              {" "}
              <i> What to kow us?</i>{" "}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug mt-4">
              ABOUT US
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[70vh] px-4 gap-8">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 max-w-lg h-[50%] flex flex-col py-8 items-center justify-center group">
            {/* Main Image */}
            <img
              src="/aboutimg2.jpg"
              alt="About Us"
              className="w-[85%]  object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105 "
              style={{ height: "30rem" }}
            />
            {/* Bottom-Left Frame */}
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 border-8 border-white rounded-lg bg-transparent translate-x-3 translate-y-3"></div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-left md:text-left pr-8">
            <h2 className="text-2xl md:text-3xl  text-black">
              <i className="">About Us</i>
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
              <i className="text-customPrimary flex flex-wrap text-left">
                Our mission is to help earth breath again
              </i>
            </h3>
            <p className=" text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur. Nulla quisque varius et
              malesuada. Non amet dignissim magna pellentesque donec dolor.
            </p>

            <div className=" container  mt-6 flex flex-col gap-6 justify-center">
              <div className="flex gap-6 justify-center  ">
                <div
                  className="p-2 flex justify-center transition-transform duration-500 ease-in-out group-hover:scale-105 "
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px rgba(184, 115, 51, 0.77) solid",
                    borderRadius: "100%",
                  }}
                >
                  <GiFamilyHouse
                    style={{ fontSize: "35px " }}
                    className="text-customPrimary"
                  />
                </div>
                <div>
                  <p className="text-lg text-black "> Who we are</p>
                  <p className=" text-gray-600">
                    Habitant ornare at pretium placerat feugiat cras quis
                    fundrising charity melis for our main mission.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="p-2 flex justify-center transition-transform duration-500 ease-in-out group-hover:scale-105 "
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px rgba(184, 115, 51, 0.77) solid",
                    borderRadius: "100%",
                  }}
                >
                  <GiWorld
                    style={{ fontSize: "35px " }}
                    className="text-customPrimary"
                  />
                </div>
                <div>
                  <p className="text-lg text-black ">Our commitment</p>
                  <p className=" text-gray-600">
                    Habitant ornare at pretium placerat feugiat cras quis
                    fundrising charity melis for our main mission.
                  </p>
                </div>
              </div>
              <div>
                <button className="px-8 z-30 py-4 bg-custombutton rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-customPrimary after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700  text-2xl">
                  Hover Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <StatsSection/>
      </section>
    </div>
  );
};

export default About;
