"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
  { month: "January", projects: 1 },
  { month: "February", projects: 3 },
  { month: "March", projects: 4 },
  { month: "April", projects: 2 },
  { month: "May", projects: 1 },
  { month: "June", projects: 6 },
];

const chartConfig = {
  projects: {
    label: "projects",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Completed</CardTitle>
        <CardDescription>Number of projects completed</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="projects"
              type="natural"
              stroke="var(--color-projects)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
