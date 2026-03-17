const LoadingSpinner = ({ className = "w-5 h-5" }) => {
  return (
    <div className={`${className} border-2 border-current border-t-transparent rounded-full animate-spin`} />
  );
};

export default LoadingSpinner;