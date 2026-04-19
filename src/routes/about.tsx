import { createFileRoute } from "@tanstack/react-router";
import { Brain, Layers, Activity, Database } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WeatherAI" },
      {
        name: "description",
        content: "How multi-variable weather forecasting works using LSTM neural networks.",
      },
    ],
  }),
  component: About,
});

function About() {
  const sections = [
    {
      icon: Layers,
      title: "What is multi-variable forecasting?",
      body: "Multi-variable (or multivariate) forecasting predicts a future value using more than one input feature at a time. Instead of looking only at past temperature to forecast tomorrow's temperature, the model also uses humidity, pressure, wind speed and rainfall — capturing how atmospheric variables interact.",
    },
    {
      icon: Brain,
      title: "How AI (LSTM) is used",
      body: "Long Short-Term Memory (LSTM) networks are a type of recurrent neural network designed to learn from sequences. They keep an internal memory of recent observations, which makes them well suited for weather time-series. WeatherAI feeds the last N days of multivariate readings into an LSTM that outputs the next-day temperature and rainfall probability.",
    },
    {
      icon: Activity,
      title: "Why it matters",
      body: "Capturing temporal dependencies between variables produces more accurate short-term forecasts than classical models. This dashboard demonstrates the workflow end-to-end: enter inputs, run the model, and visualise both predictions and historical patterns.",
    },
    {
      icon: Database,
      title: "About the data",
      body: "The interface uses a sample of daily weather readings (date, temperature, humidity, wind speed, pressure, rainfall). Predictions in this demo are generated client-side from a mock model — no backend or external API is called.",
    },
  ];

  return (
    <DashboardLayout title="About">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="relative overflow-hidden border-border/60 bg-card p-8 shadow-soft">
          <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-40" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Weather Pattern Multi-Variable Forecasting System
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              An AI-powered demo that combines deep learning with a clean dashboard to forecast
              weather variables from multivariate time-series data.
            </p>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                className="border-border/60 bg-card p-6 shadow-soft transition-smooth hover:shadow-glow"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-card">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Card>
            );
          })}
        </div>

        <Card className="border-border/60 bg-card p-6 shadow-soft">
          <h3 className="text-base font-semibold">Tech stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "React 19",
              "TypeScript",
              "TanStack Router",
              "Tailwind CSS",
              "Recharts",
              "Framer Motion",
              "shadcn/ui",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
