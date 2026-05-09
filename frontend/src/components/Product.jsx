import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-sm group cursor-pointer h-full flex flex-col p-4 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`} className="relative overflow-hidden aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col items-center text-center mt-auto">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1 hover:text-[#2874f0] transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="text-[14px] font-bold text-[#388e3c] mb-1">
          {product.discount > 0 ? `Min ${product.discount}% Off` : 'Extra Off'}
        </div>

        <div className="text-[14px] text-gray-500 font-medium">
          {product.brand}
        </div>
      </div>
    </div>
  );
};

export default Product;
