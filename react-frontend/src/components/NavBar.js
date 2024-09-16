import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaInfoCircle } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

function NavBar() {
  const location = useLocation(); // Get the current route

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side with logo and navigation */}
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold">
            <Link to="/">MySalesNav</Link> {/* Your App Name */}
          </div>
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/' ? 'font-bold text-blue-600' : ''}`}>
              Home
            </Link>
            <Link 
              to="/leads" 
              className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/leads' ? 'font-bold text-blue-600' : ''}`}>
              Leads
            </Link>
            <Link 
              to="/messages" 
              className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/messages' ? 'font-bold text-blue-600' : ''}`}>
              Messages
            </Link>
            <Link 
              to="/account" 
              className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/account' ? 'font-bold text-blue-600' : ''}`}>
              Account
            </Link>
          </div>
        </div>

        {/* Right side with icons */}
        <div className="flex items-center space-x-6">
          <FaInfoCircle className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
          <FaBell className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
          <AiOutlineUser className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
