import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts";
import { Card } from "@/components/ui/card";
import { weatherData } from "@/lib/weather-data";

const chartData = weatherData.map((r) => ({
  date: r.date.slice(5),
  temperature: r.temperature,
  rainfall: r.rainfall,
  humidity: r.humidity,
}));

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  fontSize: "0.75rem",
  color: "var(--popover-foreground)",
};

export function TemperatureChart() {
  return (
    <Card className="border-border/60 bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Temperature Trend</h3>
        <p className="text-xs text-muted-foreground">Daily temperature over the last 20 days</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#tempGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function RainfallChart() {
  return (
    <Card className="border-border/60 bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Rainfall Distribution</h3>
        <p className="text-xs text-muted-foreground">Daily rainfall (mm) over the last 20 days</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
            <Bar dataKey="rainfall" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function HumidityChart() {
  return (
    <Card className="border-border/60 bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Humidity Trend</h3>
        <p className="text-xs text-muted-foreground">Daily relative humidity (%)</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--chart-3)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
