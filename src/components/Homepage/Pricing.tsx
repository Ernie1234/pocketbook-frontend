import { useState } from "react";
import { Database } from "lucide-react";

import Wrapper from "./Wrapper";
import Chip from "../Chip";
import { pricingData } from "@/utils/data";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const [priceTarget, setPriceTarget] = useState(1);

  const onHover = (index: number) => {
    setPriceTarget(index);
  };

  return (
    <div className="border-t-2 border-dashed">
      <Wrapper className="flex flex-col justify-center items-center py-8 lg:py-16 w-full">
        <Chip
          className="flex items-center gap-2 bg-green-foreground/50 px-5 py-1 rounded-full max-w-fit font-semibold text-green text-lg capitalize"
          text="Pricing"
          Icon={Database}
        />
        <h3 className="my-4 max-w-[40rem] font-bold text-center text-green text-xl md:text-3xl lg:text-5xl leading-10">
          Transparent Pricing Tailoring To Your Needs
        </h3>
        <p className="mb-20 text-gray-500 text-xl">
          Explore our flexible pricing plans designed to match your business
          goals and budgets.
        </p>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          {pricingData.map((price, index) => (
            <PricingCard
              key={index}
              num={index}
              onHover={onHover}
              priceTarget={priceTarget}
              price={price.price}
              title={price.title}
              subTitle={price.subTitle}
              features={price.features}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
