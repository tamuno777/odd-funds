import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-customPrimary text-white w-full p-16 border-t border-black">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 FundMe. All Rights Reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="https://twitter.com" className="hover:text-green-500">Twitter</a>
        <a href="https://facebook.com" className="hover:text-green-500">Facebook</a>
        <a href="https://instagram.com" className="hover:text-green-500">Instagram</a>
      </div>
    </div>
  </footer>
  )
}

export default Footer