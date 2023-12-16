import { ArrowLeftFromLine } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-2 pt-1 pb-3 mt-4 border-b border-gray-20">
      <div className="flex items-center">
        <div className="flex items-center">
          <img
            className="w-4 h-4 mr-1"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />

          <span className="text-gray-400 font-light text-xs cursor-default">
            Safer Routes
          </span>
        </div>
      </div>

      <button
        className="w-8 h-8 rounded-full bg-teal-400 text-white flex items-center justify-center shadow-md hover:bg-teal-500 transition duration-300 ease-in-out"
        onClick={() => {
          localStorage.removeItem('jwt');
          window.location.reload();
        }}
      >
        <ArrowLeftFromLine size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Header;
