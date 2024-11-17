import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getInitials } from "@/utils/fnLib";

export function UserAvatar() {
  const { user } = useAuthStore();

  return (
    <>
      {user && (
        <div className="flex items-center gap-2">
          <p className="md:block hidden text-lg">{user.name}</p>
          <Avatar className="border-gray-200 border w-10 md:w-12 h-10 md:h-12">
            <AvatarImage
              src={user?.image || ""}
              alt="user image"
              className="object-center object-cover"
            />
            <AvatarFallback className="bg-muted font-nunito font-semibold text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      )}
    </>
  );
}
