import { useState } from "react";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetCommodityByName } from "@/hooks/queries/use-commodity";

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  commodityName: string;
}

export function ComChart({ commodityName }: Props) {
  const [chartColor, setChartColor] = useState<string>("hsl(var(--chart-2))");

  const {
    commodity: data,
    error,
    isLoading,
  } = useGetCommodityByName(commodityName.toLowerCase());

  if (error) return <p>Error fetching data</p>;
  if (isLoading) return <p>Loading...</p>;

  // Log the fetched data for debugging
  console.log("Fetched data:", data);

  // Check if prices exist
  if (!data || !data.data.prices || data.data.prices.length === 0) {
    return <p>No data available for the chart.</p>;
  }

  return (
    <ChartContainer
      config={{
        ...chartConfig,
        mobile: { ...chartConfig.mobile, color: chartColor },
      }}
    >
      <AreaChart
        accessibilityLayer
        data={data.data.prices} // Ensure this maps to the correct structure
        margin={{
          left: 12,
          right: 12,
          top: 20,
          bottom: 20,
        }}
        width={500} // Set a specific width
        height={300} // Set a specific height
      >
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke={chartColor}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
