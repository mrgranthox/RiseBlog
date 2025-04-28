import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-700 h-20 text-center flex items-center justify-center w-full overflow-hidden">
      <div className="flex justify-center gap-4 items-center text-gray-300">
        <span>©</span>
        <p>{currentYear}</p>
        <p>RiseBlog</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
