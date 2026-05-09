import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, login } = useAuth();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // For demo, we just simulate a successful registration then login
      // In a real app: await axios.post('/api/users', { name, email, password });
      await login('user@store.com', '123456'); 
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] rounded-[2px] flex flex-col md:flex-row max-w-[670px] w-full min-h-[500px] overflow-hidden">
        {/* Left Side: Flipkart Blue Panel */}
        <div className="bg-[#2874f0] text-white p-10 md:w-[40%] flex flex-col relative">
          <h1 className="text-[28px] font-semibold mb-4 leading-tight">Looks like you're new here!</h1>
          <p className="text-[18px] text-[#dbdbdb] leading-relaxed">
            Sign up with your mobile number to get started
          </p>
          
          <div className="mt-auto flex justify-center pb-4">
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
              alt="Flipkart Login Illustration" 
              className="w-full max-w-[150px] object-contain opacity-90"
            />
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="p-10 md:w-[60%] flex flex-col bg-white">
          {error && (
            <div className="bg-red-50 text-red-600 p-2 text-xs font-medium border border-red-100 mb-4 rounded-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={submitHandler} className="flex flex-col h-full">
            <div className="space-y-7 flex-grow">
              <div className="relative group">
                <input
                  required
                  type="text"
                  className={`w-full border-b-[1px] py-1 text-sm focus:outline-none transition-colors duration-300 ${focused === 'name' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'}`}
                  value={name}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${focused === 'name' || name ? '-top-3.5 text-[10px] text-[#878787]' : 'top-1 text-sm text-[#878787]'}`}>
                  Enter Name
                </label>
              </div>

              <div className="relative group">
                <input
                  required
                  type="email"
                  className={`w-full border-b-[1px] py-1 text-sm focus:outline-none transition-colors duration-300 ${focused === 'email' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'}`}
                  value={email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${focused === 'email' || email ? '-top-3.5 text-[10px] text-[#878787]' : 'top-1 text-sm text-[#878787]'}`}>
                  Enter Email/Mobile number
                </label>
              </div>

              <div className="relative group">
                <input
                  required
                  type="password"
                  className={`w-full border-b-[1px] py-1 text-sm focus:outline-none transition-colors duration-300 ${focused === 'password' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'}`}
                  value={password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${focused === 'password' || password ? '-top-3.5 text-[10px] text-[#878787]' : 'top-1 text-sm text-[#878787]'}`}>
                  Enter Password
                </label>
              </div>

              <div className="relative group">
                <input
                  required
                  type="password"
                  className={`w-full border-b-[1px] py-1 text-sm focus:outline-none transition-colors duration-300 ${focused === 'confirm' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'}`}
                  value={confirmPassword}
                  onFocus={() => setFocused('confirm')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${focused === 'confirm' || confirmPassword ? '-top-3.5 text-[10px] text-[#878787]' : 'top-1 text-sm text-[#878787]'}`}>
                  Confirm Password
                </label>
              </div>

              <p className="text-[12px] text-[#878787] leading-relaxed pt-2">
                By continuing, you agree to STORE's <span className="text-[#2874f0] font-medium cursor-pointer">Terms of Use</span> and <span className="text-[#2874f0] font-medium cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#fb641b] text-white font-bold py-3.5 rounded-[2px] text-[15px] shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] hover:bg-[#e65a18] transition-all uppercase tracking-wide disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </div>
            
            <Link to="/login" className="w-full bg-white text-[#2874f0] font-bold py-3.5 mt-3 rounded-[2px] text-[15px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] border border-gray-100 text-center uppercase">
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
