import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { School, Mail, User, BookOpen } from "lucide-react";
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
import { EXPERTISE_OPTIONS } from "../constants/auth";

const ProfessorSignUp = () => {
  useDarkMode();
  
  const { formData, isLoading, handleChange, handleSubmit } = useAuthForm(
    {
      fullName: "",
      email: "",
      institution: "",
      expertise: "",
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
      console.log("Professor sign up:", data);
      // navigate("/professor-signin");
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
          title="Create Professor Account"
          subtitle="Join our community of educators"
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
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all"
                  placeholder="Dr. Jane Smith"
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
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all"
                  placeholder="professor@institution.edu"
                  required
                />
              </div>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium mb-2">Institution/Organization</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all"
                  placeholder="University or School Name"
                  required
                />
              </div>
            </div>

            {/* Area of Expertise */}
            <div>
              <label className="block text-sm font-medium mb-2">Area of Expertise</label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                  transition-all"
                required
              >
                {EXPERTISE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
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
                className="w-4 h-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <Link to="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <GradientButton
              gradient="from-purple-500 to-pink-500"
              isLoading={isLoading}
              disabled={!formData.agreeTerms}
            >
              Create Professor Account
            </GradientButton>

            <AuthFooter
              question="Already have an account?"
              linkText="Sign in"
              linkTo="/professor-signin"
              linkColor="purple"
            />
          </form>

          <RoleSwitch
            question="Are you a student?"
            linkText="Sign up as Student"
            linkTo="/student-signup"
            linkColor="blue"
          />
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default ProfessorSignUp;