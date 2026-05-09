import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('user@store.com');
  const [password, setPassword] = useState('123456');
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
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] rounded-[2px] flex flex-col md:flex-row max-w-[670px] w-full min-h-[450px] overflow-hidden">
        {/* Left Side: Flipkart Blue Panel */}
        <div className="bg-[#2874f0] text-white p-10 md:w-[40%] flex flex-col relative">
          <h1 className="text-[28px] font-semibold mb-4 leading-tight">Login</h1>
          <p className="text-[18px] text-[#dbdbdb] leading-relaxed">
            Get access to your Orders, Wishlist and Recommendations
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
            <div className="space-y-8 flex-grow">
              {/* Input Group with Floating Label Effect */}
              <div className="relative group">
                <input
                  required
                  type="email"
                  className={`w-full border-b-[1px] py-2 text-sm focus:outline-none transition-colors duration-300 ${
                    focused === 'email' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'
                  }`}
                  value={email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
                <label 
                  className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                    focused === 'email' || email 
                    ? '-top-3.5 text-[10px] text-[#878787]' 
                    : 'top-2 text-sm text-[#878787]'
                  }`}
                >
                  Enter Email/Mobile number
                </label>
              </div>

              <div className="relative group">
                <input
                  required
                  type="password"
                  className={`w-full border-b-[1px] py-2 text-sm focus:outline-none transition-colors duration-300 ${
                    focused === 'password' ? 'border-[#2874f0]' : 'border-[#e0e0e0]'
                  }`}
                  value={password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label 
                  className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                    focused === 'password' || password 
                    ? '-top-3.5 text-[10px] text-[#878787]' 
                    : 'top-2 text-sm text-[#878787]'
                  }`}
                >
                  Enter Password
                </label>
                <div className="absolute right-0 top-2 text-[12px] text-[#2874f0] font-medium cursor-pointer">Forgot?</div>
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
                {loading ? 'Processing...' : 'Login'}
              </button>
            </div>
          </form>

          <div className="mt-auto text-center pt-8">
            <Link to="/register" className="text-[#2874f0] text-sm font-semibold hover:underline">
              New to STORE? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
