import SimpleNav from "./SimpleNav";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark text-gray-900 dark:text-white transition-colors">
      <SimpleNav />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;