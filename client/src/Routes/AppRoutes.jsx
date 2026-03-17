import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import RoleSelection from '../pages/RoleSelectionPage/RoleSelection';
import StudentSignIn from '../pages/auth/StudentAuth/StudentSignIn';
import StudentSignUp from '../pages/auth/StudentAuth/StudentSignUp';
import ProfessorSignUp from '../pages/auth/professorSignInAuth/ProfessorSignUp';
import ProfessorSignIn from '../pages/auth/professorSignInAuth/ProfessorSignIn';
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
      <Route path="/get-started" element={<RoleSelection />} />

       {/* Student Routes */}
      <Route path="/student-signin" element={<StudentSignIn />} />
      <Route path="/student-signup" element={<StudentSignUp />} />
      
      {/* Professor Routes */}
      <Route path="/professor-signin" element={<ProfessorSignIn />} />
      <Route path="/professor-signup" element={<ProfessorSignUp />} />
      
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