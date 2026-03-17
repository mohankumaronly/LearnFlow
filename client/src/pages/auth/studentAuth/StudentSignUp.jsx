import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { GraduationCap, Mail, User } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import PasswordField from "../components/auth/PasswordField";
import PasswordStrengthIndicator from "../components/auth/PasswordStrengthIndicator";
import AuthFooter from "../components/auth/AuthFooter";
import RoleSwitch from "../components/auth/RoleSwitch";
import GradientButton from "../components/ui/GradientButton";
import { useAuthForm } from "../hooks/useAuthForm";
import { useDarkMode } from "../hooks/useDarkMode";
import { fadeInUp } from "../constants/animations";

const StudentSignUp = () => {
  useDarkMode();
  
  const { formData, isLoading, handleChange, handleSubmit } = useAuthForm(
    {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false
    },
    async (data) => {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Student sign up:", data);
      // navigate("/student-signin");
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
          icon={GraduationCap}
          title="Create Student Account"
          subtitle="Join thousands of learners on LearnFlow"
          gradient="from-blue-500 to-blue-600"
        />

        <div className="p-8">
          <SocialAuthButtons />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <PasswordField
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                required
                minLength={8}
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            {/* Confirm Password */}
            <PasswordField
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
            )}

            {/* Terms and Conditions */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <GradientButton
              gradient="from-blue-500 to-purple-600"
              isLoading={isLoading}
              disabled={!formData.agreeTerms}
            >
              Create Student Account
            </GradientButton>

            <AuthFooter
              question="Already have an account?"
              linkText="Sign in"
              linkTo="/student-signin"
              linkColor="blue"
            />
          </form>

          <RoleSwitch
            question="Are you a teacher?"
            linkText="Sign up as Professor"
            linkTo="/professor-signup"
            linkColor="purple"
          />
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default StudentSignUp;