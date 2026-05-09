import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, ChevronDownIcon, UserIcon, ArrowRightOnRectangleIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50 h-14 flex items-center shadow-md">
      <div className="container mx-auto px-4 flex items-center gap-10 max-w-[1248px]">
        {/* Logo Section */}
        <div className="flex flex-col items-start leading-none">
          <Link to="/" className="text-[20px] font-bold italic tracking-wide group flex flex-col items-start">
            <span>STORE</span>
            <div className="flex items-center text-[11px] font-bold italic text-[#ffe500] hover:underline">
              <span>Explore</span>
              <span className="ml-1 text-white">Plus</span>
              <PlusIcon className="h-2 w-2 ml-0.5" />
            </div>
          </Link>
        </div>

        {/* Search Bar Section */}
        <form onSubmit={submitHandler} className="flex-grow max-w-[560px] relative">
          <div className="flex items-center bg-white rounded-sm shadow-sm overflow-hidden group">
            <input
              type="text"
              className="w-full text-gray-800 pl-4 pr-10 py-2 h-9 focus:outline-none placeholder-gray-500 text-sm"
              placeholder="Search for products, brands and more"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="px-3 text-[#2874f0]">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Action Links */}
        <div className="flex items-center space-x-10 text-[16px] font-bold">
          {userInfo ? (
            <div className="group relative cursor-pointer flex items-center space-x-1 py-4">
              <span className="hover:text-blue-100">{userInfo.name.split(' ')[0]}</span>
              <ChevronDownIcon className="h-3 w-3 group-hover:rotate-180 transition-transform" />
              <div className="absolute right-0 top-full pt-1 hidden group-hover:block w-64">
                <div className="bg-white text-gray-800 shadow-2xl rounded-sm border overflow-hidden font-medium text-sm">
                  <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-100 border-b">
                    <UserIcon className="h-4 w-4 mr-3 text-[#2874f0]" /> My Profile
                  </Link>
                  <Link to="/orders" className="flex items-center px-4 py-3 hover:bg-gray-100 border-b">
                    <GiftIcon className="h-4 w-4 mr-3 text-[#2874f0]" /> Orders
                  </Link>
                  <button onClick={logout} className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center text-red-600">
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-[#2874f0] px-9 py-1 rounded-[2px] font-bold text-[15px] hover:bg-gray-100 transition-colors h-8 flex items-center">
              Login
            </Link>
          )}

          <div className="hidden lg:flex items-center cursor-pointer group">
            <span className="hover:text-blue-100">Become a Seller</span>
          </div>

          <div className="hidden md:flex items-center space-x-1 cursor-pointer group relative py-4">
            <span>More</span>
            <ChevronDownIcon className="h-3 w-3 group-hover:rotate-180 transition-transform" />
          </div>

          <Link to="/cart" className="flex items-center relative hover:text-blue-100 group">
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff6161] text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#2874f0] font-black">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="ml-2">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
