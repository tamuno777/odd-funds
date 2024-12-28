import React, { useState } from "react";

const campaigns = [
  {
    title: "Help Children in Need",
    description: "Raising funds for underprivileged children to provide education and healthcare.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Support Clean Water Projects",
    description: "Contribute to providing clean water for communities in need.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Support Animal Rescue",
    description: "Help animals find a safe home and proper care.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Build a School for Remote Areas",
    description: "Raise funds to build a school in a remote area for children’s education.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Feed the Hungry",
    description: "Donate to provide food for the homeless and those in need.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Fund Medical Supplies for Hospitals",
    description: "Help hospitals get the necessary medical supplies for patients.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Support Mental Health Awareness",
    description: "Raise awareness and fund mental health support services.",
    imgSrc: "/hero2.jpg",
  },
  {
    title: "Build Homes for Displaced Families",
    description: "Help displaced families by providing them with homes and safety.",
    imgSrc: "/hero2.jpg",
  },
];

const PopularCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Calculate the current campaigns to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page navigation
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <section className="bg-gray-50 py-16 px-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Popular Campaigns</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCampaigns.map((campaign, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6">
              <img
                src={campaign.imgSrc}
                alt={`Campaign ${index + 1}`}
                className="w-full h-40 object-cover rounded-t-xl mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              <a href="#donate" className="text-customPrimary hover:underline">Donate Now</a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-customPrimary text-white rounded-lg hover:bg-red-800 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(campaigns.length / itemsPerPage)}
            className="px-4 py-2 mx-2 bg-customPrimary text-white rounded-lg hover:bg-red-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default PopularCampaigns;
