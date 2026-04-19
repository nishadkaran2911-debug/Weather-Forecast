import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CloudRain,
  CloudSun,
  Droplets,
  ThermometerSun,
  Wind,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeatherAI - Multi-Variable Weather Forecasting" },
      {
        name: "description",
        content:
          "Predict temperature, rainfall and atmospheric conditions with an AI-powered LSTM forecasting dashboard.",
      },
      { property: "og:title", content: "WeatherAI - Multi-Variable Weather Forecasting" },
      {
        property: "og:description",
        content: "Predict weather patterns with AI-powered multi-variable LSTM forecasting.",
      },
    ],
  }),
  component: Landing,
});

const featureCards = [
  {
    icon: Brain,
    title: "LSTM Intelligence",
    desc: "Sequence-aware predictions for shifting weather signals.",
  },
  {
    icon: BarChart3,
    title: "Clear Analytics",
    desc: "Readable charts for temperature, rainfall and trends.",
  },
  {
    icon: Zap,
    title: "Fast Forecasts",
    desc: "A responsive workflow from inputs to predictions.",
  },
];

const weatherStats = [
  { icon: ThermometerSun, label: "Temperature", value: "28.4C", tone: "text-primary" },
  { icon: Droplets, label: "Humidity", value: "72%", tone: "text-accent" },
  { icon: Wind, label: "Wind Flow", value: "12 km/h", tone: "text-emerald-400" },
  { icon: CloudRain, label: "Rainfall", value: "18 mm", tone: "text-rose-300" },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <img
        src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85"
        alt="Sunlit clouds over a mountain valley"
        className="absolute inset-0 h-full w-full object-cover opacity-45 dark:opacity-35"
      />
      <div className="landing-scrim absolute inset-0" />
      <div className="weather-grid absolute inset-0 opacity-35" />
      <div className="rain-field pointer-events-none absolute inset-0 opacity-30" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            initial={{ rotate: -12, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 14 }}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-hero shadow-glow"
          >
            <CloudSun className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white">WeatherAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/dashboard">
            <Button variant="ghost" className="hidden text-white hover:bg-white/15 sm:inline-flex">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-[1.05fr_0.95fr] md:px-12 lg:pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md"
            >
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
              LSTM weather intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Forecast tomorrow with a clearer read on every weather signal.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg"
            >
              Temperature, rainfall, humidity, wind and pressure move together. WeatherAI turns
              those patterns into clean forecasts you can inspect in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="h-12 bg-gradient-hero px-8 text-primary-foreground shadow-glow transition-smooth hover:translate-y-[-2px] hover:opacity-95"
                >
                  Open Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/25 bg-white/10 px-8 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="forecast-panel relative overflow-hidden rounded-lg border border-white/20 bg-white/12 p-5 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-cyan-100">Live model run</p>
                  <h2 className="mt-1 text-3xl font-bold text-white">Monsoon Watch</h2>
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-md bg-white/15"
                >
                  <CloudRain className="h-9 w-9 text-cyan-100" strokeWidth={1.5} />
                </motion.div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {weatherStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.45 + index * 0.08 }}
                      className="rounded-md border border-white/15 bg-black/20 p-4"
                    >
                      <Icon className={`h-5 w-5 ${stat.tone}`} />
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/60">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-md border border-white/15 bg-black/20 p-4">
                <div className="mb-4 flex items-center justify-between text-sm text-white/75">
                  <span>Forecast confidence</span>
                  <span>91%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-md bg-white/15">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "91%" }}
                    transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
                    className="h-full rounded-md bg-gradient-hero"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative border-t border-white/10 bg-background/95 px-6 py-14 backdrop-blur-md md:px-12">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-md border border-border/70 bg-card/80 p-6 text-left shadow-soft transition-smooth hover:border-primary/50 hover:shadow-glow"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-card transition-smooth group-hover:scale-105">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
