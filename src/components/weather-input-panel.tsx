import { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Gauge, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { predictWeather, type Prediction } from "@/lib/weather-data";

type Props = {
  onPredict: (p: Prediction) => void;
};

export function WeatherInputPanel({ onPredict }: Props) {
  const [temperature, setTemperature] = useState("22");
  const [humidity, setHumidity] = useState("65");
  const [windSpeed, setWindSpeed] = useState("8");
  const [pressure, setPressure] = useState("1013");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    // Simulated inference latency
    await new Promise((r) => setTimeout(r, 1100));
    const result = predictWeather({
      temperature: parseFloat(temperature) || 0,
      humidity: parseFloat(humidity) || 0,
      wind_speed: parseFloat(windSpeed) || 0,
      pressure: parseFloat(pressure) || 0,
    });
    onPredict(result);
    setLoading(false);
    toast.success("Prediction ready", {
      description: `Forecast: ${result.temperature}°C${result.willRain ? ", rain expected" : ", clear skies"}`,
    });
  };

  const fields = [
    { label: "Temperature (°C)", value: temperature, set: setTemperature, icon: Thermometer, step: "0.1" },
    { label: "Humidity (%)", value: humidity, set: setHumidity, icon: Droplets, step: "1" },
    { label: "Wind Speed (km/h)", value: windSpeed, set: setWindSpeed, icon: Wind, step: "0.1" },
    { label: "Pressure (hPa)", value: pressure, set: setPressure, icon: Gauge, step: "0.1" },
  ];

  return (
    <Card className="overflow-hidden border-border/60 bg-card p-6 shadow-soft">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Weather Inputs</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Provide current readings for the forecast model.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-card">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                {f.label}
              </Label>
              <Input
                type="number"
                step={f.step}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="bg-background transition-smooth focus-visible:ring-primary"
              />
            </div>
          );
        })}
      </div>

      <motion.div whileTap={{ scale: 0.98 }} className="mt-6">
        <Button
          onClick={handlePredict}
          disabled={loading}
          className="h-11 w-full bg-gradient-hero text-primary-foreground shadow-glow transition-smooth hover:opacity-90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running LSTM model...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Predict Weather
            </>
          )}
        </Button>
      </motion.div>
    </Card>
  );
}
