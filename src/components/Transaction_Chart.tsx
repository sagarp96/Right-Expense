import { categories } from "@/lib/Data/Categories_Data";
import { useTransactions } from "@/hooks/Querry_Data";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function TransactionChart() {
  const { data, isPending, error } = useTransactions();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  interface TransactionDataItem {
    name: string;
    amount: number;
    fill: string;
  }
  const chartData: TransactionDataItem[] = [];

  const chartConfig: Record<string, { label: string; color: string }> = {};

  if (data) {
    const getchartData = () => {
      for (let i = 0; i < data.length; i++) {
        chartData.push({
          name: data[i].Category,
          amount: data[i].Amount,
          fill: getcategoryColor(data[i].Category),
        });
      }
      return chartData;
    };

    const chartConfigData = () => {
      for (let i = 0; i < data.length; i++) {
        chartConfig[data[i].Category] = {
          label: data[i].Category,
          color: getcategoryColor(data[i].Category),
        };
      }
      return chartConfig;
    };

    function getcategoryColor(datacategory: string) {
      const categoryIndex = categories.findIndex(
        (category) => datacategory === category.name
      );
      if (categoryIndex !== -1) {
        return categories[categoryIndex].chartColor;
      }
      return "#808080";
    }

    chartConfigData();
    getchartData();

    // console.log(chartData);
    // console.log(chartConfig, "this is the CONFIGS data");
  }

  // console.log(data, "this is the chart data");
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spendings Categories</CardTitle>
        <CardDescription>Categories Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[280px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
