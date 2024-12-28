import React from "react";
import { FaWpforms } from "react-icons/fa";
import { FaBarsProgress,  FaHandHoldingDollar } from "react-icons/fa6";

const HowWeWork = () => {
  return (
    <div className="w-full">
      {" "}
      <section className="py-16 px-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
            <FaWpforms className="mx-auto mb-4 text-customPrimary " style={{ fontSize: "45px" }} />
            <h3 className="font-semibold text-lg mb-2">Create a Campaign</h3>
            <p>Start a fundraising campaign for your cause in minutes.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
          <FaHandHoldingDollar className="mx-auto mb-4 text-customPrimary " style={{fontSize:"45px"}}/>
          <h3 className="font-semibold text-lg mb-2">
              Donate to Existing Campaigns
            </h3>
            <p>Support causes you believe in and track their progress.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
          <FaBarsProgress className="mx-auto mb-4 text-customPrimary" style={{fontSize:"45px"}}/>

            <h3 className="font-semibold text-lg mb-2">
              Track Campaign Progress
            </h3>
            <p>
              Follow the success of your donation and see the impact of your
              help.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeWork;
