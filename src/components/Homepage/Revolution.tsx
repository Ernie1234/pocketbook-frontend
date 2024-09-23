import { BarChart2, Blocks, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

import Chip from "../Chip";
import Wrapper from "./Wrapper";

export default function Revolution() {
  return (
    <div className="bg-green w-full">
      <Wrapper className="flex flex-col py-16">
        <div className="flex gap-16">
          <div className="flex flex-col flex-1 justify-between space-y-4">
            <Chip
              text="Our Solutions"
              className="bg-green-600/30 px-5 py-1 rounded-full max-w-fit text-green-50 text-lg capitalize"
            />
            <h3 className="my-4 max-w-prose font-bold text-gray-50 text-xl md:text-3xl lg:text-5xl capitalize leading-10">
              Revitalutionalize your business
            </h3>
            <p className="text-green-foreground text-xl">
              Effortlessly boost sales, enhance service experiences, and drive
              marketing success with our specialized CRM solutions.
            </p>
            <Link
              to="/auth/customer/register"
              className="bg-green-foreground hover:bg-green-600 px-7 py-3 rounded-full max-w-fit font-semibold text-green text-lg"
            >
              Get Started
            </Link>
          </div>
          <div className="flex-1 border-2 border-green-foreground rounded-3xl overflow-hidden">
            <img
              src="https://img.freepik.com/premium-photo/business-handshake-partnership-contract-agreement-corporate-clients-meeting-room-crm-b2b-welcome-thank-you-hand-sign-company-deal-marketing-presentation-with-paper-data_590464-85800.jpg"
              alt="revolutionalize"
              className="flex w-full object-center object-cover"
            />
          </div>
        </div>
        <div className="gap-8 grid grid-cols-3 mt-16 w-full">
          <div className="flex flex-col justify-center gap-4 bg-gray-50 p-8 rounded-3xl w-full">
            <div className="border-2 border-gray-50 bg-green-foreground p-2 rounded-full max-w-fit">
              <BarChart2 />
            </div>
            <h3 className="font-semibold text-2xl text-green">Sales CRM</h3>

            <p className="font-semibold text-green">
              Streamline sales, manage leads, and boost revenue with our Sales
              CRM{"'"}s actionable insights.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-gray-50 p-8 rounded-3xl w-full">
            <div className="border-2 border-gray-50 bg-green-foreground p-2 rounded-full max-w-fit">
              <LayoutGrid />
            </div>
            <h3 className="font-semibold text-2xl text-green">Service CRM</h3>

            <p className="font-semibold text-green">
              Elevate service quality, resolve issues, and maintain satisfaction
              with our Service CRM
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-gray-50 p-8 rounded-3xl w-full">
            <div className="border-2 border-gray-50 bg-green-foreground p-2 rounded-full max-w-fit">
              <Blocks />
            </div>
            <h3 className="font-semibold text-2xl text-green">Marketing CRM</h3>

            <p className="font-semibold text-green">
              Crafts campaigns, tracking metrics, and converts leads seamlessly
              with our Marketing CRM
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
