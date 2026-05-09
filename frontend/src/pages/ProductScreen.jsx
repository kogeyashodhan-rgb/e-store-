import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon, ShoppingCartIcon, BoltIcon, ChevronRightIcon, TagIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/Product';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        
        // Fetch similar products (for now, we fetch all and filter out the current one)
        const { data: allData } = await axios.get('/api/products');
        const filtered = allData.products.filter(p => p._id !== id).slice(0, 5);
        setSimilarProducts(filtered);
      } catch (error) {
        console.error('Error fetching product data', error);
      }
      setLoading(false);
    };
    fetchProductAndSimilar();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4">
      <div className="container mx-auto px-4 max-w-[1248px]">
        <div className="bg-white rounded-sm shadow-sm p-4 flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Images & Action Buttons */}
          <div className="md:w-[40%] flex flex-col sticky top-20 h-fit">
            <div className="border border-gray-100 rounded-sm mb-4 h-[450px] flex items-center justify-center overflow-hidden p-6 group">
              <img src={product.image} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="flex gap-3 sticky bottom-0">
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`flex-1 flex items-center justify-center py-4 px-2 rounded-[2px] font-bold text-white shadow-md transition-all text-[16px] ${product.countInStock > 0 ? 'bg-[#ff9f00] hover:bg-[#e68f00]' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" /> ADD TO CART
              </button>
              <button
                onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
                disabled={product.countInStock === 0}
                className={`flex-1 flex items-center justify-center py-4 px-2 rounded-[2px] font-bold text-white shadow-md transition-all text-[16px] ${product.countInStock > 0 ? 'bg-[#fb641b] hover:bg-[#e65a18]' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                <BoltIcon className="h-5 w-5 mr-2" /> BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-[60%] flex flex-col pt-4">
            <nav className="flex text-[12px] text-gray-500 mb-2 items-center gap-1">
              <Link to="/" className="hover:text-[#2874f0]">Home</Link>
              <ChevronRightIcon className="h-3 w-3" />
              <Link to={`/?category=${product.category}`} className="hover:text-[#2874f0]">{product.category}</Link>
              <ChevronRightIcon className="h-3 w-3" />
              <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
            </nav>

            <h1 className="text-[18px] md:text-[20px] font-normal text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center">
                {product.rating} <StarIcon className="h-3 w-3 ml-1" />
              </div>
              <span className="text-[#878787] font-bold text-[14px]">{product.numReviews.toLocaleString()} Ratings & {Math.floor(product.numReviews/5)} Reviews</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
            </div>

            <div className="mb-4">
              <div className="text-[14px] font-bold text-[#388e3c] mb-1">Special price</div>
              <div className="flex items-baseline space-x-3">
                <span className="text-[28px] font-bold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-[16px] text-[#878787] line-through">₹{Math.round(product.price / (1 - product.discount/100)).toLocaleString('en-IN')}</span>
                    <span className="text-[16px] font-bold text-[#388e3c]">{product.discount}% off</span>
                  </>
                )}
              </div>
            </div>

            {/* Offers */}
            <div className="mb-6">
              <h4 className="text-[16px] font-bold text-gray-800 mb-3">Available offers</h4>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start text-[14px] text-gray-800">
                    <TagIcon className="h-4 w-4 text-[#388e3c] mt-1 mr-2 flex-shrink-0" />
                    <span><span className="font-bold">Bank Offer</span> 10% instant discount on STORE Bank Credit Cards, up to ₹1,250 on orders of ₹5,000 and above <span className="text-[#2874f0] font-bold cursor-pointer">T&C</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-10 text-[14px] border-b pb-6 mb-6">
              <div className="text-[#878787] font-bold w-20">Delivery</div>
              <div>
                <div className="font-bold">Delivery by {new Date(Date.now() + 3*24*60*60*1000).toDateString().split(' ').slice(0,3).join(' ')} | <span className="text-[#388e3c]">Free</span> <span className="text-[#878787] line-through ml-1">₹40</span></div>
                <div className="text-[#878787] text-[12px]">if ordered before 11:59 PM</div>
              </div>
            </div>

            <div className="flex gap-10 text-[14px] mb-8 border-b pb-6">
              <div className="text-[#878787] font-bold w-20">Highlights</div>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li>{product.description}</li>
                <li>Brand: {product.brand}</li>
                <li>Category: {product.category}</li>
                <li>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
              </ul>
            </div>

            {/* Ratings & Reviews Section */}
            <div className="mb-8 border border-gray-200 rounded-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[24px] font-semibold text-gray-800">Ratings & Reviews</h3>
                <button className="bg-white text-[#2874f0] border border-gray-200 shadow-sm px-6 py-2 rounded-sm font-semibold hover:bg-gray-50 transition-colors">Rate Product</button>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-[32px] font-normal flex items-center">
                    {product.rating} <StarIcon className="h-6 w-6 ml-1 text-gray-800" />
                  </div>
                  <div className="text-gray-500 text-[14px] mt-1">{product.numReviews.toLocaleString()} Ratings &</div>
                  <div className="text-gray-500 text-[14px]">{Math.floor(product.numReviews/5)} Reviews</div>
                </div>
                
                {/* Rating Distribution (Mock) */}
                <div className="flex-1 space-y-1 max-w-[200px] border-l pl-8">
                   {[5, 4, 3, 2, 1].map((star) => (
                     <div key={star} className="flex items-center text-[12px] text-gray-600">
                       <span className="w-4 font-bold">{star} <span className="text-[10px]">★</span></span>
                       <div className="w-full h-[5px] bg-gray-200 mx-2 rounded-full overflow-hidden">
                         <div className={`h-full ${star >= 4 ? 'bg-[#388e3c]' : star === 3 ? 'bg-[#ff9f00]' : 'bg-[#ff6161]'}`} style={{width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%`}}></div>
                       </div>
                       <span className="w-8 text-right text-gray-400">{Math.floor(product.numReviews * (star === 5 ? 0.7 : star === 4 ? 0.2 : star === 3 ? 0.05 : 0.02))}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {similarProducts.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm p-4 mt-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h2 className="text-[20px] font-bold text-gray-800">Similar Products</h2>
              <Link to="/" className="bg-[#2874f0] text-white text-[13px] font-bold px-6 py-2.5 rounded-sm shadow-md hover:bg-blue-700 transition-colors uppercase">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
