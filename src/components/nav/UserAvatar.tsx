"use client";

import { FaUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";

export function UserAvatar() {
  const user = {
    name: "John Doe",
    image: "https://example.com/john-doe.jpg",
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-2">
          <p className="md:block hidden text-lg">{user.name}</p>
          <Avatar className="border-gray-100 border w-10 md:w-12 h-10 md:h-12">
            <AvatarImage
              src={user?.image || ""}
              alt="@shadcn"
              className="object-center object-cover"
            />
            <AvatarFallback className="bg-muted">
              <FaUser className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      )}
    </>
  );
}
