import { ArrowLeftFromLine } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-2 pt-1 pb-3 mt-4 border-b border-gray-20">
      <div className="flex items-center gap-2">
        <img className="w-5" src="/logo/safer-routes.png" alt="logo" />

        <span className="text-teal-500 text-sm cursor-default mt-1">
          Safer Routes
        </span>
      </div>

      <button
        className="w-16 h-6 rounded-full bg-teal-400 text-white text-xs flex items-center justify-center gap-1 shadow-md hover:bg-teal-500 transition duration-300 ease-in-out"
        onClick={() => {
          localStorage.removeItem('jwt');
          window.location.reload();
        }}
      >
        {/* <ArrowLeftFromLine size={12} strokeWidth={2.5} /> */}
        log out
      </button>
    </div>
  );
};

export default Header;
