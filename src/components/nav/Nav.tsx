import { Bell, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";

interface IProps {
  header: string;
}

export default function Nav({ header }: IProps) {
  return (
    <div className="sticky top-0 p-4 bg-white shadow border-b border-gray-200 flex justify-between items-center min-w-full z-50">
      <h1 className="font-semibold text-xl">{header}</h1>

      <div className="flex items-center gap-12">
        <div className="relative">
          <Bell className="" size={28} />

          <div className="bg-green-400 h-2 w-2 rounded-full absolute top-0 right-1" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-6">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to="/dashboard/setting"
                  className="flex w-full h-full items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/dashboard/setting"
                  className="flex w-full h-full items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* <DropdownMenuItem
              onClick={async () => {
                await handleSignOut();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
