import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, GiftIcon, WalletIcon, PowerIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ProfileScreen = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    alert('Profile updated successfully! (Mock)');
  };

  if (!userInfo) return null;

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1248px] flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar */}
        <div className="md:w-1/4 flex flex-col gap-4">
          <div className="bg-white p-4 shadow-sm flex items-center rounded-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-[12px] text-gray-500">Hello,</div>
              <div className="font-bold text-[16px] text-gray-800">{userInfo.name}</div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-sm overflow-hidden text-[15px] font-medium text-gray-500">
            <Link to="/orders" className="flex items-center justify-between p-4 border-b hover:text-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="flex items-center"><GiftIcon className="w-6 h-6 mr-4 text-[#2874f0] group-hover:text-blue-500" /> MY ORDERS</div>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
            
            <div className="p-4 border-b">
              <div className="flex items-center mb-3"><UserIcon className="w-6 h-6 mr-4 text-[#2874f0]" /> ACCOUNT SETTINGS</div>
              <div className="flex flex-col pl-10 space-y-3">
                <Link to="/profile" className="text-[#2874f0] font-semibold">Profile Information</Link>
                <Link to="/profile" className="hover:text-blue-500">Manage Addresses</Link>
                <Link to="/profile" className="hover:text-blue-500">PAN Card Information</Link>
              </div>
            </div>

            <div className="p-4 border-b">
              <div className="flex items-center mb-3"><WalletIcon className="w-6 h-6 mr-4 text-[#2874f0]" /> PAYMENTS</div>
              <div className="flex flex-col pl-10 space-y-3">
                <Link to="/profile" className="hover:text-blue-500">Gift Cards <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">₹0</span></Link>
                <Link to="/profile" className="hover:text-blue-500">Saved UPI</Link>
                <Link to="/profile" className="hover:text-blue-500">Saved Cards</Link>
              </div>
            </div>

            <button onClick={logout} className="w-full flex items-center p-4 hover:text-red-500 hover:bg-red-50 transition-colors group">
              <PowerIcon className="w-6 h-6 mr-4 text-[#2874f0] group-hover:text-red-500" /> Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-3/4 bg-white shadow-sm rounded-sm p-8">
          <h2 className="text-[18px] font-bold text-gray-800 mb-6 flex items-center">
            Personal Information <span className="ml-4 text-[14px] text-blue-500 cursor-pointer font-medium">Edit</span>
          </h2>

          <form onSubmit={submitHandler} className="max-w-[600px]">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative group">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-gray-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-gray-500">Full Name</label>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 text-[14px] text-gray-800 font-medium">Your Gender</div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Female</span>
                </label>
              </div>
            </div>

            <h2 className="text-[18px] font-bold text-gray-800 mb-6 flex items-center mt-10">
              Email Address <span className="ml-4 text-[14px] text-blue-500 cursor-pointer font-medium">Edit</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="relative group">
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-gray-500">Email Address</label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <h3 className="text-[14px] font-bold text-gray-800">FAQs</h3>
              <p className="text-[12px] text-gray-800 font-bold">What happens when I update my email address (or mobile number)?</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;
