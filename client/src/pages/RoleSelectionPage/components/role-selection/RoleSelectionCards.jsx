import { motion } from "framer-motion";
import { Sparkles, Globe } from "lucide-react";
import { fadeInUp, staggerContainer } from "../constants/animations";
import RoleCard from "./RoleCard";

const RoleSelectionCards = ({ roles, selectedRole, onRoleSelect }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="text-center mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Join LearnFlow</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Path
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select how you want to use LearnFlow. Whether you're here to learn or teach, 
          we have the perfect tools for you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onSelect={onRoleSelect}
          />
        ))}
      </div>

      {/* Additional Info */}
      <motion.div 
        variants={fadeInUp}
        className="mt-12 text-center text-gray-600 dark:text-gray-400"
      >
        <p className="flex items-center justify-center gap-2">
          <Globe className="w-5 h-5" />
          Join 10,000+ students and teachers already on LearnFlow
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RoleSelectionCards;