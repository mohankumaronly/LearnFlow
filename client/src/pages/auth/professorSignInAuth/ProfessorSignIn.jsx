import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { School, Mail } from "lucide-react";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import PasswordField from "../components/auth/PasswordField";
import AuthFooter from "../components/auth/AuthFooter";
import RoleSwitch from "../components/auth/RoleSwitch";
import StatsPreview from "../components/auth/StatsPreview";
import GradientButton from "../components/ui/GradientButton";
import { useAuthForm } from "../hooks/useAuthForm";
import { useDarkMode } from "../hooks/useDarkMode";
import { fadeInUp } from "../constants/animations";
import { PROFESSOR_STATS } from "../constants/auth";
import AuthLayout from '../components/layout/AuthLayout';

const ProfessorSignIn = () => {
  useDarkMode();
  
  const { formData, isLoading, handleChange, handleSubmit } = useAuthForm(
    { email: "", password: "", rememberMe: false },
    async (data) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Professor sign in:", data);
      // navigate("/professor-dashboard");
    }
  );

  return (
    <AuthLayout>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <AuthHeader
          icon={School}
          title="Professor Sign In"
          subtitle="Welcome back! Continue shaping young minds"
          gradient="from-purple-500 to-purple-600"
        />

        <div className="p-8">
          <SocialAuthButtons />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all"
                  placeholder="professor@institution.edu"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
              showForgotPassword
              forgotPasswordLink="/forgot-password"
              forgotPasswordColor="purple"
              required
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
            </div>

            <GradientButton
              gradient="from-purple-500 to-pink-500"
              isLoading={isLoading}
            >
              Sign In as Professor
            </GradientButton>

            <AuthFooter
              question="Don't have an account?"
              linkText="Sign up as Professor"
              linkTo="/professor-signup"
              linkColor="purple"
            />
          </form>

          <RoleSwitch
            question="Are you a student?"
            linkText="Sign in as Student"
            linkTo="/student-signin"
            linkColor="blue"
          />
        </div>
      </motion.div>

      <StatsPreview stats={PROFESSOR_STATS} color="purple" />
    </AuthLayout>
  );
};

export default ProfessorSignIn;