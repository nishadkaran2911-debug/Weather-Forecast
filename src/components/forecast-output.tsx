import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Sun, Thermometer, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Prediction } from "@/lib/weather-data";

export function ForecastOutput({ prediction }: { prediction: Prediction | null }) {
  return (
    <Card className="relative overflow-hidden border-border/60 bg-card p-6 shadow-soft">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="relative">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Forecast Output</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              AI-generated next-day prediction.
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-card">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {prediction ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <PredictionCard
                icon={<Thermometer className="h-6 w-6" />}
                label="Temperature"
                value={`${prediction.temperature}°C`}
                accent="primary"
              />
              <PredictionCard
                icon={
                  prediction.willRain ? (
                    <CloudRain className="h-6 w-6" />
                  ) : (
                    <Sun className="h-6 w-6" />
                  )
                }
                label="Rainfall"
                value={prediction.willRain ? `Yes · ${prediction.rainfall}mm` : "No rain"}
                accent="accent"
              />
              <div className="sm:col-span-2 rounded-lg border border-border/60 bg-background/60 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Model confidence</span>
                  <span className="font-mono font-semibold text-foreground">
                    {(prediction.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.confidence * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-hero"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/40 py-12 text-center"
            >
              <div className="animate-float mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-card">
                <CloudRain className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm font-medium">No prediction yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill in the inputs and click "Predict" to get a forecast.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function PredictionCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "primary" | "accent";
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/60 p-4 transition-smooth hover:shadow-glow">
      <div
        className={
          "mb-3 flex h-10 w-10 items-center justify-center rounded-lg " +
          (accent === "primary"
            ? "bg-primary/15 text-primary"
            : "bg-accent/20 text-accent-foreground")
        }
      >
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
