import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { WeatherInputPanel } from "@/components/weather-input-panel";
import { ForecastOutput } from "@/components/forecast-output";
import { TemperatureChart, HumidityChart } from "@/components/weather-charts";
import type { Prediction } from "@/lib/weather-data";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Forecast — WeatherAI" },
      { name: "description", content: "Run AI-powered weather predictions on custom inputs." },
    ],
  }),
  component: Forecast,
});

function Forecast() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  return (
    <DashboardLayout title="Forecast">
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <WeatherInputPanel onPredict={setPrediction} />
          <ForecastOutput prediction={prediction} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <TemperatureChart />
          <HumidityChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
