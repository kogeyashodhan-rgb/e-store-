import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} STORE. All Rights Reserved.</p>
        <p className="text-xs mt-2 text-gray-500 italic">Built for a unique shopping experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
