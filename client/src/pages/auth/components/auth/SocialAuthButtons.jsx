import { SOCIAL_BUTTONS } from "../../constants/auth";

const SocialAuthButtons = () => {
  const handleClick = (e) => {
    e.preventDefault();
    alert("Social login is currently under development. Please use email sign in.");
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {SOCIAL_BUTTONS.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          onClick={handleClick}
          className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors opacity-60 cursor-not-allowed relative group"
          disabled
        >
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm font-medium">{label}</span>
          
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Coming soon
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialAuthButtons;