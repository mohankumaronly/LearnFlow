import { motion } from "framer-motion";
import { scaleOnHover } from "../../constants/animations";

const GradientButton = ({ 
  children, 
  onClick, 
  disabled, 
  isLoading,
  gradient = "from-blue-500 to-purple-600",
  type = "submit",
  className = ""
}) => {
  return (
    <motion.button
      {...scaleOnHover}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-4 bg-gradient-to-r ${gradient} 
        text-white rounded-xl font-semibold hover:opacity-90 
        transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : children}
    </motion.button>
  );
};

export default GradientButton;