import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Unauthorized = () => {
  const { user, logout } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === "STUDENT") return "/student-dashboard";
    if (user?.role === "PROFESSOR") return "/professor-dashboard";
    return "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-500">403</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
          {user && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Your role: <span className="font-semibold">{user.role}</span>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Link
            to={getDashboardPath()}
            className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
          
          <button
            onClick={logout}
            className="block w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;