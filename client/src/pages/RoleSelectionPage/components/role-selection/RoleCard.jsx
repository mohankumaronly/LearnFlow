import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import StatBadge from "../ui/StatBadge";
import { fadeInUp } from "../constants/animations";
import { roleColors } from "../constants/roles";

const RoleCard = ({ role, isSelected, onSelect }) => {
  const colors = roleColors[role.id];
  const Icon = role.icon;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer
        ${role.lightBg} ${role.darkBg}
        border-2 transition-all duration-300
        ${isSelected 
          ? `${colors.border} shadow-xl` 
          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
        }`}
      onClick={() => onSelect(role.id)}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="p-8">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} 
          flex items-center justify-center text-white mb-6 mx-auto
          transform transition-transform group-hover:scale-110`}>
          <Icon className="w-12 h-12" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3">{role.title}</h2>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {role.description}
        </p>

        {/* Quick Features Preview */}
        <div className="space-y-3 mb-6">
          {role.features.slice(0, 4).map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <div className={colors.text}>
                  <FeatureIcon className="w-5 h-5" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
              </div>
            );
          })}
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          {role.stats.map((stat, idx) => (
            <StatBadge 
              key={idx} 
              value={stat.value} 
              label={stat.label} 
              color={colors.primary}
            />
          ))}
        </div>

        {/* Select Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-6 w-full py-3 px-4 rounded-xl font-semibold
            bg-gradient-to-r ${colors.gradient} text-white
            hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
        >
          Choose {role.title}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RoleCard;