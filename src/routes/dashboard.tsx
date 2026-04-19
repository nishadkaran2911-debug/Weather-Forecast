import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { WeatherInputPanel } from "@/components/weather-input-panel";
import { ForecastOutput } from "@/components/forecast-output";
import { TemperatureChart, RainfallChart } from "@/components/weather-charts";
import { WeatherTable } from "@/components/weather-table";
import { Card } from "@/components/ui/card";
import { summaryStats, weatherData, type Prediction } from "@/lib/weather-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — WeatherAI" },
      { name: "description", content: "Live weather dashboard with AI predictions, charts, and dataset overview." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const stats = summaryStats(weatherData);

  const statCards = [
    { label: "Avg Temperature", value: `${stats.avgTemp}°C`, icon: Thermometer },
    { label: "Avg Humidity", value: `${stats.avgHumidity}%`, icon: Droplets },
    { label: "Avg Wind Speed", value: `${stats.avgWind} km/h`, icon: Wind },
    { label: "Total Rainfall", value: `${stats.totalRainfall} mm`, icon: CloudRain },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stat row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="border-border/60 bg-card p-5 shadow-soft transition-smooth hover:shadow-glow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-card">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Predict section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <WeatherInputPanel onPredict={setPrediction} />
          <ForecastOutput prediction={prediction} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TemperatureChart />
          <RainfallChart />
        </div>

        {/* Table */}
        <WeatherTable />
      </div>
    </DashboardLayout>
  );
}
