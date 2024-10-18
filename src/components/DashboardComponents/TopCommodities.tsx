import { useNavigate } from "react-router-dom";

import { useGetAllCommodities } from "@/hooks/queries/use-commodity";
import { calculatePercentageChange } from "@/utils/fnLib";
import TopComCard from "./TopComCard";

export default function TopCommodities() {
  const navigate = useNavigate();
  const { commodities, isLoading, error, isError } = useGetAllCommodities();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const filteredCom = commodities?.slice(0, 4);

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-medium text-black text-lg capitalize">
        Top commodities
      </p>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {filteredCom?.map((item) => {
          const comPrice = item.prices.at(-1)?.price;
          const comUnit = item.unit.replace("per ", "");
          const lastPrice = item.prices.slice(-2).map((item) => item.price);
          const avgPrice = calculatePercentageChange(lastPrice);
          return (
            <TopComCard
              key={item._id}
              name={item.commodityName}
              prices={comPrice}
              unit={comUnit}
              priceList={item.prices}
              avgPrice={avgPrice}
            />
          );
        })}
      </div>
    </div>
  );
}
