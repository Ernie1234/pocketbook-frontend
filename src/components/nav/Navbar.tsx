import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import Wrapper from "../Homepage/Wrapper";
import { navLinks } from "@/utils/data";

export default function Navbar() {
  return (
    <nav className="border-green-foreground bg-green border-b">
      <Wrapper className="flex justify-between items-center p-4 text-green-foreground">
        <Link to="/">
          <div className="lg:flex hidden">
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="w-40 object-contain"
            />
          </div>
          <div className="flex lg:hidden">
            <img
              src="/Frame 2.png"
              alt="logo"
              className="w-8 sm:w-12 md:w-14 object-contain"
            />
          </div>
        </Link>
        <ul className="md:flex items-center gap-8 hidden">
          {navLinks.map((link) => (
            <li key={link.text} className="text-green-foreground">
              <Link to={link.path}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="sm:flex items-center gap-4 hidden">
            <Link to="/auth/register">
              <Button className="bg-green-foreground hover:bg-green-600 font-semibold text-green">
                Sign up
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button className="bg-green-950 hover:bg-green-900">
                Sign In
              </Button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger>
              <Menu className="block md:hidden text-green-500" size={30} />
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-center items-center bg-green-50">
              <ul className="flex flex-col justify-center items-start gap-8">
                {navLinks.map((link) => (
                  <li key={link.text} className="text-2xl text-green-500">
                    <Link to={link.path}></Link>
                    {link.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-4 sm:hidden mt-4">
                <Link to="/auth/register">
                  <Button className="bg-green-foreground hover:bg-green-600 font-semibold text-green">
                    Sign up
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button className="bg-green-950 hover:bg-green-900">
                    Sign In
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Wrapper>
    </nav>
  );
}
