import { TbCurrencyNaira } from "react-icons/tb";

// interface Props {
//   adjust?: boolean;
// }

export default function PortfolioBalance() {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg border border-gray-200 h-full">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium">Portfolio Balance</p>
        <div className="">
          <p className="">1 d</p>
        </div>
      </div>
      <h4 className="font-bold flex items-center">
        <TbCurrencyNaira size={24} />
        <span className="text-xl">{500}</span>
      </h4>
      {/* <PortfolioChart data={comPrice} /> */}
      {/* <Chart portfolio={portfolio} adjust={adjust} /> */}
    </div>
  );
}
