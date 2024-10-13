import { Link } from "react-router-dom";

import { Button } from "../ui/button";

interface IProps {
  title: string;
  subtitle: string;
  showBtn?: boolean;
  btnTitle?: string;
}

export default function Empty({ title, subtitle, showBtn, btnTitle }: IProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <img
        className="mt-5 w-20 object-contain"
        src="/assets/emptySet.png"
        alt="Empty Transaction"
      />

      <h2 className="mt-4 font-semibold text-2xl">{title}</h2>
      <p className="w-10/12 text-center">{subtitle}</p>

      {showBtn && btnTitle && (
        <Link to="/dashboard/commodity" className="mt-8">
          <Button className="border-2 border-foreground bg-transparent hover:bg-muted px-12 py-3 rounded-md text-foreground">
            {btnTitle}
          </Button>
        </Link>
      )}
    </div>
  );
}
