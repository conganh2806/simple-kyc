import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiShieldCheckLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowRightSLine,
} from "react-icons/ri";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Features", path: "/#features" },
    { name: "How it Works", path: "/#how-it-works" },
    { name: "Pricing", path: "/#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white transform group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-600/20">
              <RiShieldCheckLine size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Simple<span className="text-blue-600">KYC</span>
            </span>
          </Link>

          {!isAuthPage && (
            <>
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-600/25"
                >
                  Get Started
                  <RiArrowRightSLine
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>

              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <RiCloseLine size={24} />
                ) : (
                  <RiMenuLine size={24} />
                )}
              </button>
            </>
          )}

          {isAuthPage && (
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>

      {!isAuthPage && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 origin-top ${
            isMobileMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <Link
                to="/login"
                className="block w-full text-center text-base font-medium text-gray-700 hover:text-blue-600 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-blue-600 text-white px-5 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
