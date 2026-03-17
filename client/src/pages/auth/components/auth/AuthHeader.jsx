const AuthHeader = ({ icon: Icon, title, subtitle, gradient }) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} px-8 py-6 text-white`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-white/80 text-sm">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;