import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { weatherData } from "@/lib/weather-data";
import { Badge } from "@/components/ui/badge";

export function WeatherTable() {
  return (
    <Card className="border-border/60 bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Sample Weather Dataset</h3>
          <p className="text-xs text-muted-foreground">
            Showing {weatherData.length} most recent observations
          </p>
        </div>
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
          {weatherData.length} rows
        </Badge>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs">Date</TableHead>
              <TableHead className="text-xs">Temp (°C)</TableHead>
              <TableHead className="text-xs">Humidity (%)</TableHead>
              <TableHead className="text-xs">Wind (km/h)</TableHead>
              <TableHead className="text-xs">Pressure (hPa)</TableHead>
              <TableHead className="text-xs">Rainfall (mm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weatherData.map((row) => (
              <TableRow key={row.date} className="text-sm transition-smooth hover:bg-accent/10">
                <TableCell className="font-mono text-xs">{row.date}</TableCell>
                <TableCell>{row.temperature.toFixed(1)}</TableCell>
                <TableCell>{row.humidity.toFixed(1)}</TableCell>
                <TableCell>{row.wind_speed.toFixed(1)}</TableCell>
                <TableCell>{row.pressure.toFixed(1)}</TableCell>
                <TableCell>
                  {row.rainfall > 0 ? (
                    <span className="font-medium text-primary">{row.rainfall.toFixed(1)}</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
