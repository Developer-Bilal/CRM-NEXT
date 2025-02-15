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
  { allData: "projects", count: 10, fill: "var(--color-projects)" },
  { allData: "users", count: 12, fill: "var(--color-users)" },
  { allData: "clients", count: 8, fill: "var(--color-clients)" },
  { allData: "developers", count: 6, fill: "var(--color-developers)" },
  // { allData: "other", count: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  projects: {
    label: "projects",
    color: "hsl(var(--chart-1))",
  },
  users: {
    label: "users",
    color: "hsl(var(--chart-2))",
  },
  clients: {
    label: "clients",
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
        <CardTitle>Total Count </CardTitle>
        <CardDescription>Our progress so far! </CardDescription>
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
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total count for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
