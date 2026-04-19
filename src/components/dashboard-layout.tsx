import { type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, CloudRain, BarChart3, Info, CloudSun, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/forecast", label: "Forecast", icon: CloudRain },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/about", label: "About", icon: Info },
] as const;

export function DashboardLayout({ children, title }: { children: ReactNode; title: string }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero shadow-glow">
            <CloudSun className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-sidebar-foreground">WeatherAI</span>
            <span className="text-[10px] text-muted-foreground">Forecasting System</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-lg bg-gradient-card p-3">
            <p className="text-xs font-medium text-sidebar-foreground">Powered by LSTM</p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Multi-variable time series forecasting
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero shadow-glow">
                <CloudSun className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-background/50 px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-smooth",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/30",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
