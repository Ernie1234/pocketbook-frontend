import Sidebar from "./Sidebar";

interface IProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
