import { Link } from "react-router-dom";
import Wrapper from "../Homepage/Wrapper";

export default function Footer() {
  return (
    <footer className="bg-green-50">
      <Wrapper className="flex flex-col py-8 lg:py-16 w-full">
        <div className="flex justify-between items-center">
          <small className="text-base">
            © Copyright 2024. All rights reserved
          </small>
          <div className="flex gap-6 text-base">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms & Conditions</Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
