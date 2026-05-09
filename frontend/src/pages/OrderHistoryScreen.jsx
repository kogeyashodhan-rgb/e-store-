import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, GiftIcon, WalletIcon, PowerIcon, ChevronRightIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid';

const OrderHistoryScreen = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  if (!userInfo) return null;

  // Mock Orders Data
  const orders = [
    {
      _id: 'ORD-594083',
      date: 'Oct 12, 2026',
      total: 134900,
      status: 'Delivered',
      productName: 'Apple iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
      color: 'Natural Titanium'
    },
    {
      _id: 'ORD-912345',
      date: 'Sep 05, 2026',
      total: 12990,
      status: 'Returned',
      productName: 'Nike Air Max',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      color: 'Red/White'
    }
  ];

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1248px] flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar (Same as Profile for consistency) */}
        <div className="md:w-1/4 flex flex-col gap-4 hidden md:flex">
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
            <Link to="/orders" className="flex items-center justify-between p-4 border-b text-blue-500 bg-blue-50 group">
              <div className="flex items-center"><GiftIcon className="w-6 h-6 mr-4 text-blue-500" /> MY ORDERS</div>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
            
            <div className="p-4 border-b">
              <div className="flex items-center mb-3"><UserIcon className="w-6 h-6 mr-4 text-[#2874f0]" /> ACCOUNT SETTINGS</div>
              <div className="flex flex-col pl-10 space-y-3">
                <Link to="/profile" className="hover:text-blue-500">Profile Information</Link>
                <Link to="/profile" className="hover:text-blue-500">Manage Addresses</Link>
                <Link to="/profile" className="hover:text-blue-500">PAN Card Information</Link>
              </div>
            </div>

            <button onClick={logout} className="w-full flex items-center p-4 hover:text-red-500 hover:bg-red-50 transition-colors group">
              <PowerIcon className="w-6 h-6 mr-4 text-[#2874f0] group-hover:text-red-500" /> Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-3/4 flex flex-col gap-4">
          
          {/* Search Bar for Orders */}
          <div className="bg-white shadow-sm rounded-sm p-4 flex items-center">
            <div className="relative flex-grow max-w-[500px]">
              <input 
                type="text" 
                placeholder="Search your orders here" 
                className="w-full border border-gray-300 rounded-[2px] pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#2874f0]"
              />
              <div className="absolute right-0 top-0 bottom-0 bg-[#2874f0] w-12 flex items-center justify-center rounded-r-[2px] cursor-pointer">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <button className="ml-4 flex items-center text-[14px] font-medium border border-gray-300 px-4 py-2 rounded-[2px] hover:bg-gray-50">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link to={`/order/${order._id}`} key={order._id} className="bg-white shadow-sm rounded-sm p-4 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center border border-transparent hover:border-gray-200 cursor-pointer">
                
                {/* Product Info */}
                <div className="flex items-center flex-grow w-full md:w-auto mb-4 md:mb-0 gap-6">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={order.image} alt={order.productName} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-gray-800 font-medium hover:text-[#2874f0]">{order.productName}</span>
                    <span className="text-[12px] text-gray-500 mt-1">Color: {order.color}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="w-full md:w-32 flex-shrink-0 text-gray-800 font-medium text-[14px] mb-4 md:mb-0">
                  ₹{order.total.toLocaleString('en-IN')}
                </div>

                {/* Status */}
                <div className="w-full md:w-64 flex flex-col">
                  <div className="flex items-center mb-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${order.status === 'Delivered' ? 'bg-[#26a541]' : order.status === 'Returned' ? 'bg-[#ff6161]' : 'bg-gray-400'}`}></div>
                    <span className="text-[14px] font-bold text-gray-800">{order.status} on {order.date}</span>
                  </div>
                  <div className="text-[12px] text-gray-500 ml-4">
                    {order.status === 'Delivered' ? 'Your item has been delivered' : 'Item was returned successfully'}
                  </div>
                  {order.status === 'Delivered' && (
                    <div className="text-[#2874f0] text-[12px] font-bold ml-4 mt-2 flex items-center">
                      <StarIcon className="w-4 h-4 mr-1 text-gray-400" /> Rate & Review Product
                    </div>
                  )}
                </div>

              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
