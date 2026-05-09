import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircleIcon, QrCodeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const CheckoutScreen = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);
    setStep(2);
  };

  const handleVerifyPay = () => {
    setShowQR(true);
  };

  const handleFinalDone = () => {
    setPaidAmount(total);
    setStep(3); // Loading state
    setTimeout(() => {
      clearCart();
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded shadow-xl border-t-4 border-green-500 max-w-md w-full text-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-6">Your order has been successfully confirmed.</p>
          <div className="bg-gray-50 p-4 rounded mb-6 text-sm text-left">
            <p className="mb-1"><strong>Order ID:</strong> ORD-{Math.floor(Math.random() * 1000000)}</p>
            <p><strong>Amount Paid:</strong> ₹{paidAmount.toLocaleString('en-IN')}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition-colors"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-6 max-w-5xl">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl p-6 max-w-sm w-full animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to proceed with the payment of <strong className="text-gray-800">₹{total.toLocaleString('en-IN')}</strong>?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmOrder}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {step === 1 && (
            <div className="bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden mb-6">
              <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
                <span className="bg-white text-blue-600 w-6 h-6 rounded-sm flex items-center justify-center font-bold mr-3">1</span>
                <span className="font-bold uppercase tracking-wider">Delivery Address</span>
              </div>
              <form onSubmit={handleDeliverySubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <input required type="text" className="w-full border p-2 text-sm focus:outline-blue-500" placeholder="e.g. John Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Street Address</label>
                  <textarea required className="w-full border p-2 text-sm focus:outline-blue-500" rows="2" placeholder="House No, Building, Street, Area"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input required type="text" className="w-full border p-2 text-sm focus:outline-blue-500" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pincode</label>
                  <input required type="text" className="w-full border p-2 text-sm focus:outline-blue-500" placeholder="400001" />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-bold text-sm shadow-md hover:bg-[#e65a18] transition-all uppercase">
                    Deliver Here & Proceed
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden mb-6">
              <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
                <CheckCircleIcon className="h-6 w-6 mr-3" />
                <span className="font-bold uppercase tracking-wider">Payment Verification</span>
              </div>
              
              <div className="p-6 text-center">
                {!showQR ? (
                  <div className="py-10">
                    <ShieldCheckIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Order Summary Verified</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">Click below to generate your secure UPI QR Code and complete the payment.</p>
                    <button 
                      onClick={handleVerifyPay}
                      className="bg-blue-600 text-white px-10 py-4 rounded-sm font-bold text-lg shadow-xl hover:bg-blue-700 transition-all uppercase flex items-center mx-auto"
                    >
                      <QrCodeIcon className="h-6 w-6 mr-2" /> VERIFY & PAY ₹{total.toLocaleString('en-IN')}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="border-2 border-blue-600 rounded-2xl p-6 bg-white shadow-2xl flex flex-col items-center w-full max-w-xs relative overflow-hidden">
                      <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black absolute top-2 right-2">STORE PAY</div>
                      <h3 className="text-sm font-bold text-gray-400 mb-4 mt-2 tracking-widest">BHIM UPI</h3>
                      
                      <div className="scanning-laser p-2 bg-white border border-gray-100 rounded-lg shadow-inner mb-4">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9343585693@axl%26pn=STORE%26am=${total}%26cu=INR`} 
                          alt="Payment QR" 
                          className="w-40 h-40"
                        />
                      </div>
                      
                      <div className="text-lg font-black text-gray-800 mb-1 tracking-wider">9343585693@axl</div>
                      <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase">Scan and pay with any BHIM UPI app</p>
                      
                      <div className="flex items-center gap-3 grayscale opacity-70">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-4" alt="UPI" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" className="h-3" alt="GPay" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" className="h-3" alt="PhonePe" />
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleFinalDone}
                      className="mt-8 bg-green-600 text-white px-10 py-4 rounded-sm font-bold text-lg shadow-xl hover:bg-green-700 transition-all uppercase flex items-center group"
                    >
                      <CheckCircleIcon className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" /> I HAVE COMPLETED THE PAYMENT
                    </button>
                    <p className="text-xs text-gray-400 mt-4 italic">Funds will be verified within seconds</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-20 shadow-sm border border-gray-100 rounded-sm text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-lg font-bold text-gray-700">Verifying Payment...</p>
              <p className="text-sm text-gray-500">Connecting to bank servers, please do not refresh.</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white shadow-sm border border-gray-100 rounded-sm sticky top-24">
            <div className="p-4 border-b">
              <h2 className="text-gray-500 font-bold text-sm uppercase">Order Summary</h2>
            </div>
            <div className="p-4 border-b max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.product} className="flex justify-between items-center mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-12 object-contain border p-1" />
                    <div>
                      <p className="font-bold text-gray-700 line-clamp-1">{item.name}</p>
                      <p className="text-gray-400">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Items Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="border-t border-dashed pt-4 flex justify-between text-lg font-black text-gray-800">
                <span>TOTAL PAY</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
