const SuccessStory = ({ story, color = "green" }) => {
  const colorClasses = {
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400"
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <img 
        src={story.image} 
        alt={story.name} 
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h4 className="font-semibold">{story.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{story.role}</p>
        <p className={`text-sm ${colorClasses[color]}`}>
          {color === "green" ? "✨" : "📚"} {story.achievement}
        </p>
      </div>
    </div>
  );
};

export default SuccessStory;