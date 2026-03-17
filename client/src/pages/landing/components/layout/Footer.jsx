import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from "../../constants/animations";
import { footerLinks, socialLinks } from "../../constants/navigation";
import { useHashNavigation } from "../../hooks/useHashNavigation";

const Footer = () => {
  const { handleHashClick } = useHashNavigation();

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'github':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        );
      case 'license':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.footer 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={fadeInUp}>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl">LearnFlow</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Transform your learning experience with our all-in-one platform.
            </p>
          </motion.div>
          
          {/* Product Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.product.map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }}>
                  <a
                    href={item.hash}
                    onClick={(e) => handleHashClick(e, item.hash)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.company.map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }}>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Legal & Open Source */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold mb-4">Legal & Open Source</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.legal.map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              {/* Open Source Links */}
              {footerLinks.openSource.map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }} className="pt-2">
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    {renderIcon(item.icon)}
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          variants={fadeInUp}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LearnFlow. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {renderIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-xs mt-4">
            Built with ❤️ for the open source community | 
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white ml-1">
              Hosted on Vercel
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;