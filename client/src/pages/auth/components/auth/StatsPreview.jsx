import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/animations";

const StatsPreview = ({ stats, color = "blue" }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="mt-8 grid grid-cols-3 gap-4"
    >
      {stats.map((item, idx) => (
        <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <div className={`text-lg font-bold text-${color}-600 dark:text-${color}-400`}>{item.value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default StatsPreview;