import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import LoadingSpinner from "../common/LoadingSpinner";
import ScrollToTop from "../common/ScrollToTop";
import ErrorBoundary from "../common/ErrorBoundary";
import NotFound from "../common/NotFound";

const LandingPage = lazy(() => import("../pages/landing/LandingPage"));
const RoleSelection = lazy(() => import("../pages/RoleSelectionPage/RoleSelection"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const StudentSignUp = lazy(() => import("../pages/auth/studentAuth/StudentSignUp"));
const ProfessorSignUp = lazy(() => import("../pages/auth/professorSignInAuth/ProfessorSignUp"));
const StudentDashboard = lazy(() => import("../pages/studentDashboard/StudentDashboard"));
const ProfessorDashboard = lazy(() => import("../pages/professorDashboard/ProfessorDashboard"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const VideoPlayerPage = lazy(() => import("../pages/studentDashboard/components/courses/VideoPlayerPage"));
const CourseDetailsPage = lazy(() => import("../pages/studentDashboard/components/courses/CourseDetailsPage"));

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const PublicRoute = ({ children }) => {
    if (isAuthenticated && user?.role) {
      const dashboardPath = user.role === "STUDENT" 
        ? "/student-dashboard" 
        : "/professor-dashboard";
      return <Navigate to={dashboardPath} replace />;
    }
    return children;
  };

  const AuthRedirect = ({ children }) => {
    if (isAuthenticated && user?.role) {
      const dashboardPath = user.role === "STUDENT" 
        ? "/student-dashboard" 
        : "/professor-dashboard";
      return <Navigate to={dashboardPath} replace />;
    }
    return children;
  };

  // Wrapper for routes that need suspense and error handling
  const RouteWrapper = ({ children, isProtected = false, requiredRole = null }) => {
    let content = children;
    
    if (isProtected) {
      content = <ProtectedRoute>{children}</ProtectedRoute>;
    }
    
    if (requiredRole) {
      content = <RoleRoute role={requiredRole}>{content}</RoleRoute>;
    }
    
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {content}
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <RouteWrapper>
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            </RouteWrapper>
          } 
        />
        
        <Route 
          path="/get-started" 
          element={
            <RouteWrapper>
              <PublicRoute>
                <RoleSelection />
              </PublicRoute>
            </RouteWrapper>
          } 
        />
        
        <Route 
          path="/role-selection" 
          element={
            <RouteWrapper>
              <PublicRoute>
                <RoleSelection />
              </PublicRoute>
            </RouteWrapper>
          } 
        />

        {/* Auth Routes */}
        <Route 
          path="/signin" 
          element={
            <RouteWrapper>
              <AuthRedirect>
                <SignIn />
              </AuthRedirect>
            </RouteWrapper>
          } 
        />

        {/* Redirect old routes */}
        <Route 
          path="/student-signin" 
          element={<Navigate to="/signin" replace />} 
        />
        <Route 
          path="/professor-signin" 
          element={<Navigate to="/signin" replace />} 
        />

        {/* Signup Routes */}
        <Route 
          path="/student-signup" 
          element={
            <RouteWrapper>
              <AuthRedirect>
                <StudentSignUp />
              </AuthRedirect>
            </RouteWrapper>
          } 
        />
        
        <Route 
          path="/professor-signup" 
          element={
            <RouteWrapper>
              <AuthRedirect>
                <ProfessorSignUp />
              </AuthRedirect>
            </RouteWrapper>
          } 
        />

        {/* Error Routes */}
        <Route 
          path="/unauthorized" 
          element={
            <RouteWrapper>
              <Unauthorized />
            </RouteWrapper>
          } 
        />

        {/* Profile Route */}
        <Route 
          path="/profile" 
          element={
            <RouteWrapper isProtected={true}>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">Profile Page</h1>
                  <p className="text-gray-600">Coming Soon...</p>
                </div>
              </div>
            </RouteWrapper>
          } 
        />

        {/* Student Routes */}
        <Route 
          path="/student-dashboard" 
          element={
            <RouteWrapper requiredRole="STUDENT">
              <StudentDashboard />
            </RouteWrapper>
          } 
        />

        <Route 
          path="/course/:courseId" 
          element={
            <RouteWrapper isProtected={true}>
              <CourseDetailsPage />
            </RouteWrapper>
          } 
        />

        <Route 
          path="/course/:courseId/video/:videoId" 
          element={
            <RouteWrapper isProtected={true}>
              <VideoPlayerPage />
            </RouteWrapper>
          } 
        />

        {/* Professor Routes */}
        <Route 
          path="/professor-dashboard" 
          element={
            <RouteWrapper requiredRole="PROFESSOR">
              <ProfessorDashboard />
            </RouteWrapper>
          } 
        />

        {/* 404 Route - Always last */}
        <Route 
          path="*" 
          element={
            <RouteWrapper>
              <NotFound />
            </RouteWrapper>
          } 
        />
      </Routes>
    </>
  );
};

export default AppRoutes;