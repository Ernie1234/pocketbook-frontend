import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ComChart() {
  const chartColor = "red";
  const chartData = [
    { name: "Day 1", price: 400 },
    { name: "Day 2", price: 300 },
    { name: "Day 3", price: 200 },
    { name: "Day 4", price: 500 },
    { name: "Day 5", price: 600 },
    { name: "Day 6", price: 700 },
    { name: "Day 7", price: 800 },
  ];

  return (
    <ChartContainer
      config={{
        ...chartConfig,
        mobile: { ...chartConfig.mobile, color: chartColor },
      }}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
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
    //   </CardContent>
    // </Card>
  );
}
