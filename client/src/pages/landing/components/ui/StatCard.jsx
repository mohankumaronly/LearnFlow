import { motion } from "framer-motion";
import { scaleIn } from "../../constants/animations";

const StatCard = ({ value, label }) => {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.1 }}
      className="text-center"
    >
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        {value}
      </div>
      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  );
};

export default StatCard;