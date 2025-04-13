import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import axios from '../../config/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/auth/forgotpassword', { email });
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f5] to-[#f8e1e7] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-[#e96989] py-6 px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Reset Password</h2>
            <p className="text-white/90 mt-2">We'll send you a reset link</p>
          </div>

          <div className="p-8">
            {emailSent ? (
              <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Reset link sent! Please check your email.
                </div>
                <p className="mb-6 text-gray-600">
                  We've sent an email to <strong>{email}</strong> with instructions to reset your password.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center text-[#e96989] hover:text-[#d05878] font-medium"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <p className="mb-6 text-gray-600">
                  Enter your email address below and we'll send you a link to reset your password.
                </p>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#e96989] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#d05878] transition-colors duration-300 shadow-md"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </motion.button>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-[#e96989] hover:text-[#d05878] font-medium"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword; 