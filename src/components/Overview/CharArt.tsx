import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Rectangle,
  AreaChart,
  Area,
} from "recharts";
import { useEffect, useState } from "react";
import { ChartData, TimeSeriesValues } from "@/types";

export function Charts({ selectedName }: { selectedName: string }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/item.json");
        const data = await response.json();
        console.log("data", data);
        const timeSeries = data["Time Series (5min)"];

        const processedData: ChartData[] = Object.entries(timeSeries)
          .map(([timestamp, values]) => {
            const typedValues = values as TimeSeriesValues;
            return {
              timestamp,
              close: parseFloat(typedValues["4. close"]),
              volume: parseInt(typedValues["5. volume"]),
              open: parseFloat(typedValues["1. open"]),
              high: parseFloat(typedValues["2. high"]),
              low: parseFloat(typedValues["3. low"]),
            };
          })
          .reverse();
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedName]);

  const latestData = chartData[chartData.length - 1] || {};
  const totalVolume = chartData.reduce((sum, item) => sum + item.volume, 0);

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      <Card className="bg-[#1a1b1f] border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm text-gray-400">TLV</CardTitle>
          <div className="text-2xl font-bold text-white">
            ${latestData.close?.toFixed(2) || "0.00"} B
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ChartContainer
              config={{
                close: {
                  label: "Close Price",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorClose" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fc087e" stopOpacity={1} />
                      <stop offset="100%" stopColor="#fc087e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString([], {
                        hour: "2-digit",
                        hour12: false,
                      })  
                    }
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide={true} domain={["auto", "auto"]} axisLine={false} tickLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) =>
                          new Date(label).toLocaleString()
                        }
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#fc087e"
                    fill="url(#colorClose)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1b1f] border-gray-800">
        <CardHeader className="flex justify-between items-center flex-row">
          <div>
            <CardTitle className="text-sm text-gray-400">Volume</CardTitle>
            <div className="text-2xl font-medium text-white">
              {totalVolume.toLocaleString()} m
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-white border border-gray-800 rounded-md px-2 py-1">
              D
            </button>
            <button className="text-gray-400 hover:text-white border border-gray-800 rounded-md px-2 py-1">
              W
            </button>
            <button className="text-gray-400 hover:text-white border border-gray-800 rounded-md px-2 py-1">
              M
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ChartContainer
              config={{
                volume: {
                  label: "Volume",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString([], {
                        hour: "2-digit",
                        hour12: false,
                      })
                    }
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide={true} domain={["auto", "auto"]} axisLine={false} tickLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) =>
                          new Date(label).toLocaleString()
                        }
                      />
                    }
                  />
                  <Bar
                    dataKey="volume"
                    fill="#2072e6"
                    activeBar={
                      <Rectangle
                        fill="var(--color-volume-active)"
                        stroke="var(--color-volume)"
                      />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
