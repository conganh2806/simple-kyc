import {
  RiMenuLine,
  RiSearchLine,
  RiNotification3Line,
  RiMoonLine,
  RiApps2Line,
  RiShieldCheckLine,
} from "react-icons/ri";
import { useAppSelector } from "../app/store";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white transition-all duration-300">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center text-orange-500">
                <RiShieldCheckLine size={28} />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Simple KYC
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
            >
              <RiMenuLine size={24} />
            </button>

            <div className="ml-4 hidden md:block">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiSearchLine className="text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:block">
              <RiNotification3Line size={20} />
            </button>
            <button className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:block">
              <RiApps2Line size={20} />
            </button>
            <button className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:block">
              <RiMoonLine size={20} />
            </button>

            <div className="group relative ml-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user?.avatar || "https://i.imgur.com/FPiPFrN.jpg"}
                  alt="user photo"
                />
              </div>

              <div className="absolute top-full right-0 z-50 hidden w-48 list-none divide-y divide-gray-100 rounded border border-gray-100 bg-white text-base shadow group-hover:block">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500">
                    {user?.email}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
