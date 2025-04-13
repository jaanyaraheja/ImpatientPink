import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HeroImage from './components/HeroImage';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import About from './components/About';
import BrandMessage from './components/BrandMessage';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Products from './components/Products';
import SketchBoard from './components/SketchBoard';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminRoute from './components/Auth/AdminRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-sans">
          <TopBar />
          
          <Routes>
            <Route path="/" element={
              <>
                <HeroImage />
                <HeroSection />
                <Gallery />
                <About />
                <BrandMessage />
                <Reviews />
                <Contact />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:resettoken" element={<ResetPassword />} />
            <Route path="/products" element={<Products />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/sketch-board" 
              element={
                <PrivateRoute>
                  <SketchBoard />
                </PrivateRoute>
              } 
            />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;