"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { allData: "High", count: 10, fill: "var(--color-High)" },
  { allData: "Medium", count: 12, fill: "var(--color-Medium)" },
  { allData: "Low", count: 8, fill: "var(--color-Low)" },
  //   { allData: "developers", count: 6, fill: "var(--color-developers)" },
  // { allData: "other", count: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  High: {
    label: "High",
    color: "hsl(var(--chart-1))",
  },
  Medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  Low: {
    label: "Low",
    color: "hsl(var(--chart-3))",
  },
  developers: {
    label: "Developers",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Level</CardTitle>
        <CardDescription>Projects update by priority level </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="allData"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
