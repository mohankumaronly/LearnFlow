import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/animations";

const SectionHeader = ({ 
  badge, 
  badgeIcon: BadgeIcon, 
  badgeColor = "blue",
  title, 
  description 
}) => {
  const badgeColors = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  };

  return (
    <motion.div variants={fadeInUp} className="text-center mb-12">
      {badge && (
        <motion.div 
          variants={fadeInUp}
          className={`inline-flex items-center gap-2 ${badgeColors[badgeColor]} px-4 py-2 rounded-full mb-6`}
        >
          {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
          <span className="text-sm font-medium">{badge}</span>
        </motion.div>
      )}
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

export default SectionHeader;