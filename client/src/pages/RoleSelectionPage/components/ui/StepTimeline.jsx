const StepTimeline = ({ steps, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  };

  return (
    <div className="space-y-4">
      {steps.map((item) => (
        <div key={item.step} className="flex gap-3">
          <div className={`w-6 h-6 ${colorClasses[color]} rounded-full 
            flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
            {item.step}
          </div>
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepTimeline;