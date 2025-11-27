import { Link, useLocation } from "react-router-dom";
import {
  RiUserLine,
  RiFileList3Line,
  RiSettings4Line,
  RiHome4Line,
} from "react-icons/ri";
import { useAppSelector } from "../app/store";
import { UserRole } from "../models/auth";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const isOfficer = user?.role === UserRole.Officer;

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <RiHome4Line size={20} />,
      allowed: true,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <RiUserLine size={20} />,
      allowed: true,
    },
    {
      name: "KYC Submissions",
      path: "/kyc/submissions",
      icon: <RiFileList3Line size={20} />,
      allowed: isOfficer,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <RiSettings4Line size={20} />,
      allowed: true,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            if (!item.allowed) return null;

            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center rounded-lg p-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span
                    className={isActive ? "text-gray-900" : "text-gray-500"}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
