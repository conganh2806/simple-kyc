import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiShieldCheckLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowRightSLine,
  RiUser3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="transform rounded-xl bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
              <RiShieldCheckLine size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Simple<span className="text-blue-600">KYC</span>
            </span>
          </Link>

          {/* NAVIGATION */}
          {!isAuthPage && (
            <>
              <nav className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="group relative text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* RIGHT SIDE ACTIONS (Desktop) */}
              <div className="hidden items-center gap-4 md:flex">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                      <div className="hidden text-right lg:block">
                        <p className="text-sm leading-none font-bold text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>

                      {/* Avatar Image */}
                      <div className="group relative cursor-pointer">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt="Avatar"
                            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-blue-600 shadow-md">
                            <RiUser3Line size={20} />
                          </div>
                        )}
                        {/* Status Dot */}
                        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="rounded-full p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                      title="Logout"
                    >
                      <RiLogoutBoxRLine size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="group flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-600/25"
                    >
                      Get Started
                      <RiArrowRightSLine
                        size={16}
                        className="cursor-pointer transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="p-2 text-gray-600 transition-colors hover:text-blue-600 md:hidden"
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
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {!isAuthPage && (
        <div
          className={`absolute top-full right-0 left-0 origin-top border-b border-gray-100 bg-white shadow-lg transition-all duration-300 md:hidden ${
            isMobileMenuOpen
              ? "translate-y-0 scale-y-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-y-0 opacity-0"
          }`}
        >
          <div className="space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block rounded-lg px-4 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <div className="space-y-3 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                // --- MOBILE: ĐÃ ĐĂNG NHẬP ---
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <RiUser3Line size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-xl bg-red-50 px-5 py-3 text-center text-base font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // --- MOBILE: CHƯA ĐĂNG NHẬP ---
                <>
                  <Link
                    to="/login"
                    className="block w-full py-2 text-center text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full rounded-xl bg-blue-600 px-5 py-3 text-center text-base font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
