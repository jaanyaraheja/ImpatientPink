import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaFilter, FaSearch, FaRupeeSign, FaShoppingCart } from 'react-icons/fa';
import axios from '../config/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    
    // Check for category parameter in URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
      setIsFilterOpen(true);
    }
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('/products/add-to-cart', { 
        productId,
        quantity: 1
      });
      
      if (response.data.success) {
        // Show success message
        alert('Product added to cart successfully!');
        // Optionally navigate to cart/orders
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(err.response?.data?.message || 'Failed to add product to cart');
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryFilter === 'all' || categoryFilter === product.category;
    
    let priceMatch = true;
    if (priceFilter === 'under5000') priceMatch = product.price < 5000;
    else if (priceFilter === 'under10000') priceMatch = product.price >= 5000 && product.price < 10000;
    else if (priceFilter === 'above10000') priceMatch = product.price >= 10000;
    
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'co-ord', label: 'Co-ord' },
    { value: 'ethnic', label: 'Ethnic Wear' },
    { value: 'shirt', label: 'Shirts' },
    { value: 'indowest', label: 'Indo-western' },
    { value: 'dress', label: 'Dresses' },
    { value: 'kids', label: 'Kids' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under5000', label: 'Under ₹5000' },
    { value: 'under10000', label: 'Under ₹10000' },
    { value: 'above10000', label: 'Above ₹10000' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#e96989] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">Impatient Pink</Link>
            <nav className="flex space-x-6">
              <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-gray-300 transition-colors font-medium">Products</Link>
              <Link to="/#about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link to="/#contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div 
            className="relative w-full md:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={categoryFilter === category.value}
                      onChange={() => setCategoryFilter(category.value)}
                      className="h-4 w-4 text-[#e96989] focus:ring-[#e96989]"
                    />
                    <span className="text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={priceFilter === range.value}
                      onChange={() => setPriceFilter(range.value)}
                      className="h-4 w-4 text-[#e96989] focus:ring-[#e96989]"
                    />
                    <span className="text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e96989]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {product.trending && (
                      <span className="bg-[#e96989] text-white text-xs font-bold px-2 py-1 rounded-full">
                        Trending
                      </span>
                    )}
                    {product.new && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-[#e96989] font-bold mb-4 flex items-center">
                    Starting from INR {product.price.toLocaleString('en-IN')}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#e96989] text-white rounded-lg hover:bg-[#d05878] transition-colors"
                    >
                      <FaShoppingCart />
                      Inquire
                    </button>
                    <a 
                      href={`https://wa.me/919818405428?text=Hey%20Shivani,%20I%20love%20the%20${encodeURIComponent(product.name)}!%20Can%20you%20share%20more%20details?`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;