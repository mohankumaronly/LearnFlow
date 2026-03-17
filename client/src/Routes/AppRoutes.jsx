import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
// Import other pages as you create them
// import AboutPage from '../pages/AboutPage';
// import PricingPage from '../pages/PricingPage';
// import SignInPage from '../pages/SignInPage';
// import SignUpPage from '../pages/SignUpPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main landing page route */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Additional routes you can add later */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/pricing" element={<PricingPage />} /> */}
      {/* <Route path="/signin" element={<SignInPage />} /> */}
      {/* <Route path="/signup" element={<SignUpPage />} /> */}
      {/* <Route path="/features" element={<FeaturesPage />} /> */}
      {/* <Route path="/for-teachers" element={<ForTeachersPage />} /> */}
      {/* <Route path="/for-students" element={<ForStudentsPage />} /> */}
      
      {/* 404 route - catch all unmatched routes */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;