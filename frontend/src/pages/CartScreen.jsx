import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white p-10 rounded shadow-sm inline-block max-w-lg w-full border">
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 mb-8">Add items to it now.</p>
          <Link to="/" className="bg-blue-600 text-white px-10 py-3 rounded-sm font-bold shadow-md hover:bg-blue-700 transition-colors inline-block">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:flex-grow bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-white sticky top-16 md:top-0 z-10">
            <h1 className="text-lg font-bold text-gray-800">My Cart ({cartItems.length})</h1>
          </div>
          
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.product} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex items-center space-x-4 md:col-span-2">
                  <div className="w-20 h-24 flex-shrink-0 border rounded-sm p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`} className="text-base font-medium text-gray-800 hover:text-blue-600 line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase">{item.brand}</p>
                    <p className="text-xs text-gray-400 mt-1">Seller: STORE Retail</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-center">
                  <div className="md:text-center font-bold text-gray-800 text-lg">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="flex items-center mt-3 border rounded-sm w-fit bg-gray-50">
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      onClick={() => addToCart(item, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >-</button>
                    <span className="px-4 py-1 text-sm font-bold border-l border-r bg-white">{item.qty}</span>
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      onClick={() => addToCart(item, item.qty + 1)}
                      disabled={item.qty >= item.countInStock}
                    >+</button>
                  </div>
                </div>

                <div className="flex justify-end md:justify-center">
                  <button 
                    onClick={() => removeFromCart(item.product)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 md:p-6 bg-white border-t flex justify-end sticky bottom-0 z-10 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            <button 
              onClick={checkoutHandler}
              className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold text-lg shadow-lg hover:bg-[#e65a18] transition-all transform active:scale-95 uppercase"
            >
              Place Order
            </button>
          </div>
        </div>

        <div className="w-full lg:w-96 bg-white rounded shadow-sm border border-gray-100 sticky top-24">
          <div className="p-4 border-b">
            <h2 className="text-base font-bold text-gray-500 uppercase tracking-wider">Price Details</h2>
          </div>
          <div className="p-4 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Price ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} items)</span>
              <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t border-dashed pt-4 flex justify-between text-lg font-bold text-gray-900">
              <span>Total Amount</span>
              <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="text-green-600 text-sm font-bold pt-2">
              You will save ₹{Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price * 0.1, 0)).toLocaleString('en-IN')} on this order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
