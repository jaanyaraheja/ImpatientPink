import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaUser, FaPhoneAlt, FaInfoCircle, FaHome, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const getNavItems = () => {
    const baseItems = [
      { path: '/', name: 'Home', icon: <FaHome className="mr-2" /> },
      { path: '/products', name: 'Products', icon: <FaShoppingBag className="mr-2" /> },
      { path: '/#about', name: 'About', icon: <FaInfoCircle className="mr-2" /> },
      { path: '/#contact', name: 'Contact', icon: <FaPhoneAlt className="mr-2" /> },
    ];

    if (user) {
      return [
        ...baseItems,
        { path: '/dashboard', name: 'Orders', icon: <FaClipboardList className="mr-2" /> },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      // For hash links, navigate to home first if not already there
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const elementId = path.substring(2);
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If already on home page, just scroll to the section
        const elementId = path.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // For regular links, use normal navigation
      navigate(path);
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#e96989] shadow-lg py-2' : 'bg-[#e96989]/90 py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Impatient Pink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
            
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center ml-4 px-4 py-2 bg-white text-[#e96989] rounded-lg font-medium hover:bg-white/90 transition-colors duration-200"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center ml-4 px-4 py-2 bg-white text-[#e96989] rounded-lg font-medium hover:bg-white/90 transition-colors duration-200"
              >
                <FaUser className="mr-2" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6 mb-1.5'}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-5 mb-1.5'}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-4'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 mt-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 bg-white text-[#e96989] rounded-lg font-medium hover:bg-white/90 transition-colors duration-200 mt-2"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-3 bg-white text-[#e96989] rounded-lg font-medium hover:bg-white/90 transition-colors duration-200 mt-2"
              >
                <FaUser className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;