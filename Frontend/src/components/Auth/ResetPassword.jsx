import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import axios from '../../config/axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resettoken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.put(`/auth/resetpassword/${resettoken}`, { password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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
            <p className="text-white/90 mt-2">Create a new password</p>
          </div>

          <div className="p-8">
            {success ? (
              <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Password reset successful!
                </div>
                <p className="mb-6 text-gray-600">
                  Your password has been reset. You will be redirected to the login page in a moment...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <p className="mb-6 text-gray-600">
                  Please enter your new password below.
                </p>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                      placeholder="Create a new password"
                      required
                      minLength="6"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                      placeholder="Confirm your new password"
                      required
                      minLength="6"
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
                  {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword; 