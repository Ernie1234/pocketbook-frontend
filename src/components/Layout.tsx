import { cn } from "@/lib/utils";
import Sidebar from "./shared/Sidebar";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: Props) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className={cn("w-full", className)}>{children}</main>

        {/* <Sidebar />
        <div className="w-full">{children}</div> */}
      </div>
    </>
  );
}
