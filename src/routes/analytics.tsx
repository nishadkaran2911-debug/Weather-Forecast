import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Thermometer, CloudRain, Droplets, Gauge, Wind, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { TemperatureChart, RainfallChart, HumidityChart } from "@/components/weather-charts";
import { summaryStats, weatherData } from "@/lib/weather-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — WeatherAI" },
      { name: "description", content: "Weather analytics with summary statistics and trends." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const stats = summaryStats(weatherData);

  const cards = [
    { label: "Average Temperature", value: `${stats.avgTemp}°C`, icon: Thermometer, hint: `min ${stats.minTemp}° · max ${stats.maxTemp}°` },
    { label: "Max Rainfall", value: `${stats.maxRainfall} mm`, icon: CloudRain, hint: `${stats.rainyDays} rainy days` },
    { label: "Average Humidity", value: `${stats.avgHumidity}%`, icon: Droplets, hint: "across observation period" },
    { label: "Average Pressure", value: `${stats.avgPressure} hPa`, icon: Gauge, hint: "atmospheric mean" },
    { label: "Average Wind Speed", value: `${stats.avgWind} km/h`, icon: Wind, hint: "daily average" },
    { label: "Total Rainfall", value: `${stats.totalRainfall} mm`, icon: TrendingUp, hint: "accumulated total" },
  ];

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="relative overflow-hidden border-border/60 bg-card p-5 shadow-soft transition-smooth hover:shadow-glow">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-card opacity-50" />
                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-card">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{c.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TemperatureChart />
          <RainfallChart />
        </div>
        <HumidityChart />
      </div>
    </DashboardLayout>
  );
}
