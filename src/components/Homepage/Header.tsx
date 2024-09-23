import { Link } from "react-router-dom";

import Chip from "../Chip";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center bg-green min-h-dvh">
      <Chip
        className="bg-green-600/20 px-4 py-1.5 rounded-full text-center text-green-50 text-lg capitalize"
        text="ai based support"
      />

      <h1 className="my-4 max-w-prose font-bold text-3xl text-center text-green-100 md:text-5xl lg:text-7xl capitalize">
        Revitalize team dynamics <br /> data-driven CRM
      </h1>
      <p className="my-5 max-w-prose text-2xl text-center text-green-foreground">
        Manage the relation your business and customer perfectly with AI based
        customer Relationship Management
      </p>
      <div className="flex space-x-5 mt-8">
        <Link
          to="/about"
          className="bg-green-50 hover:bg-green-100 px-7 py-3 rounded-full font-semibold text-green text-lg"
        >
          Learn More
        </Link>
        <Link
          to="/auth/customer/register"
          className="bg-green-foreground hover:bg-green-600 px-7 py-3 rounded-full font-semibold text-green text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
