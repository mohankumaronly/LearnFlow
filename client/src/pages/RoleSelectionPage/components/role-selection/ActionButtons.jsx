import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { fadeInUp } from "../constants/animations";

const ActionButtons = ({ role, onContinue, onSignIn, gradient = "from-blue-500 to-purple-600" }) => {
  const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onContinue}
        className={`flex-1 py-4 bg-gradient-to-r ${gradient} 
          text-white rounded-xl font-semibold hover:opacity-90 
          transition-opacity flex items-center justify-center gap-2`}
      >
        Continue as {roleCapitalized}
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={onSignIn}
        className="flex-1 py-4 border border-gray-300 dark:border-gray-600 
          text-gray-700 dark:text-gray-300 rounded-xl font-semibold 
          hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Already have an account? Sign In
      </button>
    </motion.div>
  );
};

export default ActionButtons;