import React from 'react';

const GallerySection = () => {
  return (
    <div className="w-full py-16 px-1 lg:py-0 lg:px-0 bg-gray-50 mb-10">
      {/* <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Gallery</h2> */}
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1">
        
        {/* Image 1 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal1.jpg"
            alt="Gallery Image 1"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
        
        {/* Image 2 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal2.jpg"
            alt="Gallery Image 2"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
        
        {/* Image 3 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal6.jpg"
            alt="Gallery Image 3"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
        
        {/* Image 4 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal4.jpg"
            alt="Gallery Image 4"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
        
        {/* Image 5 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal5.jpg"
            alt="Gallery Image 5"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
        
        {/* Image 6 */}
        <div className="group relative overflow-hidden">
          <img
            src="/gal3.jpg"
            alt="Gallery Image 6"
            className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
