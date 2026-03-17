import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const SimpleNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-bold text-xl">LearnFlow</span>
          </Link>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNav;