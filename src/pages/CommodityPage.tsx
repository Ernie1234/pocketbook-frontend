import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineShowChart } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsChevronExpand } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useGetCommodityBySlug } from "@/hooks/queries/use-commodity";
import { useAuthStore } from "@/store/authStore";

import Nav from "@/components/nav/Nav";
import EditCommodity from "@/components/CommodityComponents/EditCommodity";
import TransButtons from "@/components/CommodityComponents/TransButtons";
import { calculatePercentageChange, formatPrice } from "@/utils/fnLib";
import AboutCommodity from "@/components/CommodityComponents/AboutCommodity";
import { RecentTransaction } from "@/components/shared/RecentTransaction";
import { QuickAction } from "@/components/DashboardComponents/QuickAction";

export default function CommodityPage() {
  const { slug } = useParams<{ slug: string }>();

  const { commodity, isLoading, error } = useGetCommodityBySlug(slug);
  const { user } = useAuthStore();
  const role = user?.role;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const comPrice = 10;
  //   const comPrice = commodity?.prices?.at(-1)?.price;
  const unitQty = commodity?.quantity;
  const lastPrice = [8];
  //   const lastPrice = commodity?.prices.slice(-2).map((item) => item.price);

  const avgPrice = lastPrice && calculatePercentageChange(lastPrice);

  console.log(commodity?.createdAt);

  return (
    <div className="w-full min-h-dvh">
      <Nav header="Commodity Market" />
      <div className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <div className="flex justify-between items-center mb-5">
          <Link
            to="/dashboard/commodities"
            className="flex items-center gap-2 font-semibold"
          >
            <IoChevronBack size={22} />
            Back
          </Link>
          <EditCommodity
            role={role}
            name={commodity?.commodityName}
            price={comPrice}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            <div className="rounded-2xl border-2 bg-background w-full flex flex-col gap-1 p-4">
              <h3 className="font-bold text-xs uppercase text-gray-500">
                {commodity?.commodityName}
              </h3>
              <div className="flex justify-between items-center gap-8">
                <div className="flex gap-3 justify-center items-center">
                  <p className="text-3xl font-bold flex items-center justify-center">
                    <TbCurrencyNaira size={34} />
                    <span className="">
                      {comPrice && formatPrice(comPrice)}
                    </span>
                  </p>
                  <div className="flex space-x-1">
                    <MdOutlineShowChart
                      size={24}
                      className={cn(
                        avgPrice && avgPrice < 0
                          ? "text-red-400"
                          : avgPrice && avgPrice > 0
                          ? "text-green-500"
                          : "text-neutral-700"
                      )}
                    />
                    <p
                      className={cn(
                        avgPrice && avgPrice < 0
                          ? "text-red-400"
                          : avgPrice && avgPrice > 0
                          ? "text-green-500"
                          : "text-neutral-700"
                      )}
                    >
                      {avgPrice}%
                    </p>
                  </div>
                </div>
                <TransButtons />
              </div>
              <p className="font-semibold text-muted-foreground">
                {unitQty} Unit{unitQty && (unitQty > 1 ? "s" : "")}
              </p>
              <Separator className="my-4 bg-gray-300 h-[1.5px]" />
              <div className="flex justify-between min-h-min h items-center text-sm">
                <div className="flex flex-col justify-center w-full">
                  <p className="text-3xl uppercase font-semibold">
                    {commodity?.commodityName}
                  </p>
                  <span className="text-lg text-left text-muted-foreground uppercase font-semibold">
                    smaz
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center w-full border-x-2 border-gray-300">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground">
                      Market Price
                    </span>
                    <div className="flex items-center text-left w-full">
                      <TbCurrencyNaira size={30} />
                      <span className="text-2xl font-semibold">
                        {comPrice && formatPrice(comPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full border-r-2 border-gray-300">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground">
                      Unit
                    </span>
                    <div className="flex items-center text-left w-full">
                      <span className="text-2xl font-semibold capitalize">
                        {commodity?.unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground flex items-center gap-1.5">
                      <AiOutlineClockCircle />
                      24h change
                      <BsChevronExpand />
                    </span>
                    <div className="flex items-center text-left w-full">
                      <span className="text-2xl font-semibold capitalize">
                        <p
                          className={cn(
                            avgPrice && avgPrice < 0
                              ? "text-red-400"
                              : avgPrice && avgPrice > 0
                              ? "text-green-500"
                              : "text-neutral-700"
                          )}
                        >
                          {/* {avgChange && avgChange} */}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AboutCommodity
              name={commodity?.commodityName}
              desc={commodity?.description}
            />
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col gap-8">
            <QuickAction />
            <RecentTransaction />
          </div>
        </div>
      </div>
    </div>
  );
}
