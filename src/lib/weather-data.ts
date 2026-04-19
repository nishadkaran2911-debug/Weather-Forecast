export type WeatherRow = {
  date: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  rainfall: number;
};

// Sample subset of the dataset (Jan-Feb 2024) for tables/charts
export const weatherData: WeatherRow[] = [
  { date: "2024-01-01", temperature: 20.99, humidity: 47.99, wind_speed: 2.24, pressure: 1022.06, rainfall: 0.55 },
  { date: "2024-01-02", temperature: 19.9, humidity: 51.81, wind_speed: 13.89, pressure: 1014.79, rainfall: 0.0 },
  { date: "2024-01-03", temperature: 21.64, humidity: 51.44, wind_speed: 3.53, pressure: 1014.97, rainfall: 0.0 },
  { date: "2024-01-04", temperature: 23.56, humidity: 52.56, wind_speed: 9.49, pressure: 1016.41, rainfall: 7.85 },
  { date: "2024-01-05", temperature: 20.22, humidity: 48.89, wind_speed: 5.56, pressure: 1010.1, rainfall: 7.07 },
  { date: "2024-01-06", temperature: 20.39, humidity: 53.56, wind_speed: 9.2, pressure: 1018.45, rainfall: 16.42 },
  { date: "2024-01-07", temperature: 24.19, humidity: 56.6, wind_speed: 10.47, pressure: 1013.57, rainfall: 0.0 },
  { date: "2024-01-08", temperature: 22.74, humidity: 62.04, wind_speed: 12.79, pressure: 1017.75, rainfall: 0.0 },
  { date: "2024-01-09", temperature: 20.44, humidity: 60.25, wind_speed: 4.68, pressure: 1012.01, rainfall: 0.93 },
  { date: "2024-01-10", temperature: 22.63, humidity: 66.88, wind_speed: 2.14, pressure: 1019.59, rainfall: 4.12 },
  { date: "2024-01-11", temperature: 20.79, humidity: 52.93, wind_speed: 3.78, pressure: 1015.01, rainfall: 14.21 },
  { date: "2024-01-12", temperature: 20.96, humidity: 61.78, wind_speed: 13.7, pressure: 1023.91, rainfall: 19.11 },
  { date: "2024-01-13", temperature: 22.54, humidity: 58.97, wind_speed: 13.36, pressure: 1011.15, rainfall: 17.14 },
  { date: "2024-01-14", temperature: 18.4, humidity: 69.63, wind_speed: 9.77, pressure: 1014.02, rainfall: 7.77 },
  { date: "2024-01-15", temperature: 18.94, humidity: 55.25, wind_speed: 9.81, pressure: 1007.84, rainfall: 12.99 },
  { date: "2024-01-16", temperature: 21.44, humidity: 55.7, wind_speed: 10.65, pressure: 1010.35, rainfall: 0.0 },
  { date: "2024-01-17", temperature: 20.7, humidity: 57.5, wind_speed: 4.28, pressure: 1016.09, rainfall: 6.68 },
  { date: "2024-01-18", temperature: 23.52, humidity: 50.46, wind_speed: 13.89, pressure: 1018.65, rainfall: 0.0 },
  { date: "2024-01-19", temperature: 21.24, humidity: 59.01, wind_speed: 7.44, pressure: 1027.83, rainfall: 5.63 },
  { date: "2024-01-20", temperature: 20.4, humidity: 58.4, wind_speed: 6.98, pressure: 1012.52, rainfall: 5.89 },
];

export type Prediction = {
  temperature: number;
  rainfall: number;
  willRain: boolean;
  confidence: number;
};

/**
 * Mock LSTM-style prediction. Combines inputs with small noise so the same
 * inputs are reproducible-ish while still feeling "AI"-y.
 */
export function predictWeather(input: {
  temperature: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
}): Prediction {
  const { temperature, humidity, wind_speed, pressure } = input;

  // Simple weighted "model" — pretends to be an LSTM
  const tempBias = (1015 - pressure) * 0.05 + (humidity - 60) * 0.02;
  const predictedTemp = temperature + tempBias + (Math.random() - 0.5) * 1.5;

  // Rainfall likelihood based on humidity/pressure/wind
  const rainScore =
    (humidity - 50) * 0.04 +
    (1015 - pressure) * 0.08 +
    wind_speed * 0.03 +
    (Math.random() - 0.5) * 0.4;

  const willRain = rainScore > 0.6;
  const rainfallMm = willRain ? Math.max(0.5, rainScore * 8 + Math.random() * 5) : 0;
  const confidence = Math.min(0.98, Math.max(0.55, 0.7 + Math.abs(rainScore - 0.6) * 0.4));

  return {
    temperature: Number(predictedTemp.toFixed(2)),
    rainfall: Number(rainfallMm.toFixed(2)),
    willRain,
    confidence: Number(confidence.toFixed(2)),
  };
}

export function summaryStats(rows: WeatherRow[]) {
  const n = rows.length;
  const avg = (k: keyof WeatherRow) =>
    rows.reduce((s, r) => s + (r[k] as number), 0) / n;
  const max = (k: keyof WeatherRow) =>
    rows.reduce((m, r) => Math.max(m, r[k] as number), -Infinity);
  const min = (k: keyof WeatherRow) =>
    rows.reduce((m, r) => Math.min(m, r[k] as number), Infinity);

  return {
    avgTemp: Number(avg("temperature").toFixed(1)),
    maxTemp: Number(max("temperature").toFixed(1)),
    minTemp: Number(min("temperature").toFixed(1)),
    avgHumidity: Number(avg("humidity").toFixed(1)),
    maxRainfall: Number(max("rainfall").toFixed(1)),
    totalRainfall: Number(rows.reduce((s, r) => s + r.rainfall, 0).toFixed(1)),
    avgWind: Number(avg("wind_speed").toFixed(1)),
    avgPressure: Number(avg("pressure").toFixed(1)),
    rainyDays: rows.filter((r) => r.rainfall > 1).length,
  };
}
