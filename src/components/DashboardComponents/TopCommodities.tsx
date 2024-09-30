export default function TopCommodities() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-medium text-black text-lg capitalize">
        Top commodities
      </p>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {/* {filterdComm.map((item) => {
          const comPrice = item.price.at(-1)?.price;
          const comUnit = item.unit.replace("per ", "");
          const lastPrice = item.price.slice(-2).map((item) => item.price);
          const avgPrice = calculatePercentageChange(lastPrice);
          return (
            <TopComCard
              key={item.id}
              name={item.name}
              price={comPrice}
              unit={comUnit}
              priceList={item.price}
              avgPrice={avgPrice}
            />
          );
        })} */}
      </div>
    </div>
  );
}
