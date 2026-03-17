import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AnimatedButton = ({ 
  children, 
  to, 
  onClick, 
  variant = "primary", 
  className = "",
  icon: Icon,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90",
    secondary: "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };

  const buttonContent = (
    <>
      {children}
      {Icon && <Icon className="w-5 h-5" />}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: `${baseStyles} ${variants[variant]} ${className}`
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to}>{buttonContent}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;