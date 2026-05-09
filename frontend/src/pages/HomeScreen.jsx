import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [keyword]);

  const categories = [
    { name: 'Mobiles', img: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
    { name: 'Electronics', img: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100' },
    { name: 'Appliances', img: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100' },
    { name: 'Fashion', img: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100' },
    { name: 'Beauty', img: 'https://rukminim1.flixcart.com/flap/128/128/image/ee15701b678a39b4.png?q=100' },
    { name: 'Home & Kitchen', img: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e7148064.png?q=100' },
    { name: 'Furniture', img: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2c021f97a8f6.png?q=100' },
    { name: 'Travel', img: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100' },
    { name: 'Grocery', img: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e7148064.png?q=100' }
  ];

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      {/* Category Strip */}
      <div className="bg-white shadow-sm overflow-x-auto mb-4 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between min-w-[1248px] max-w-[1248px]">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center group cursor-pointer w-24">
              <div className="w-16 h-16 mb-1">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-[14px] font-bold text-gray-800 text-center tracking-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1248px]">
        {/* Mock Banner */}
        <div className="w-full h-[280px] bg-gray-300 rounded-sm mb-6 relative overflow-hidden shadow-sm">
          <img src="https://rukminim1.flixcart.com/flap/1248/280/image/1d34f07a7e8705f4.jpg?q=90" alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-2 rounded-r shadow cursor-pointer">
             <ChevronRightIcon className="h-6 w-6 rotate-180" />
          </div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-2 rounded-l shadow cursor-pointer">
             <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Product Section Card */}
        <div className="bg-white rounded-sm shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <div>
              <h2 className="text-[20px] font-bold text-gray-800">
                {keyword ? `Search results for "${keyword}"` : 'Deals of the Day'}
              </h2>
              <p className="text-[14px] text-gray-500 font-medium">Top recommendations for you</p>
            </div>
            <button className="bg-[#2874f0] text-white text-[13px] font-bold px-6 py-2.5 rounded-sm shadow-md hover:bg-blue-700 transition-colors uppercase">
              View All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-80 rounded-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
