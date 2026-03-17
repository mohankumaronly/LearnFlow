const StatBadge = ({ value, label, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400"
  };

  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
};

export default StatBadge;