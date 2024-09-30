import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Button } from "../ui/button";
import { dashboardLinks } from "@/utils/data";

export default function Sidebar() {
  const { pathname } = useLocation();

  const role = "ADMIN";

  return (
    <aside className="top-0 sticky flex flex-col justify-between bg-green-800 p-4 min-w-min max-h-dvh">
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <Link to="/dashboard">
          <div className="lg:flex hidden">
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="w-40 object-contain"
            />
          </div>
          <div className="flex lg:hidden">
            <img
              src="/assets/Frame 2.png"
              alt="logo"
              className="w-8 sm:w-12 md:w-14 object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
          {dashboardLinks.map(({ path, text, icon: Icon }, index) => (
            <Link
              key={index}
              to={path}
              className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
                pathname === path
                  ? "text-white bg-green-700 font-medium"
                  : "text-gray-100 hover:text-gray-300"
              } transition-all duration-300 rounded-md`}
            >
              <Icon size={20} />
              <p className="lg:block hidden">{text}</p>
            </Link>
          ))}
          {role === "ADMIN" && (
            <Link
              to="/admin/sell"
              className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
                pathname === "/admin"
                  ? "text-white bg-green-700 font-medium"
                  : "text-gray-100 hover:text-gray-300"
              } transition-all duration-300 rounded-md`}
            >
              <MdOutlineAdminPanelSettings size={20} />
              <p className="lg:block hidden">Administrator</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button className="border-gray-100 hover:border-gray-100/10 bg-gray-50 hover:bg-gray-200/50 shadow-md border rounded-full w-full text-green-700 hover:text-white transition-all duration-300">
          Buy
        </Button>
        <Button className="border-gray-100 bg-transparent hover:bg-white border rounded-full w-full hover:text-green-700 transition-all duration-300">
          Sell
        </Button>
      </div>
    </aside>
  );
}
