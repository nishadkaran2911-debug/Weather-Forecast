import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distClientDir = path.join(__dirname, '../dist/client');
const publicDir = path.join(__dirname, '../public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Find the main JS and CSS files in assets
const assetsDir = path.join(distClientDir, 'assets');
let mainJsFile = '';
let mainCssFile = '';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  
  // Find the main index JS file (not route chunks)
  const indexFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js'));
  if (indexFiles.length > 0) {
    // Get the largest one (main bundle)
    mainJsFile = indexFiles.reduce((prev, current) => {
      const prevSize = fs.statSync(path.join(assetsDir, prev)).size;
      const currentSize = fs.statSync(path.join(assetsDir, current)).size;
      return currentSize > prevSize ? current : prev;
    });
  }
  
  // Find CSS file
  const cssFiles = files.filter(f => f.startsWith('styles-') && f.endsWith('.css'));
  if (cssFiles.length > 0) {
    mainCssFile = cssFiles[0];
  }
}

// Generate index.html
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WeatherAI — Multi-Variable Forecasting System</title>
  <meta name="description" content="AI-powered weather forecasting dashboard using LSTM models for multi-variable predictions: temperature, humidity, wind, pressure, rainfall.">
  <meta name="author" content="WeatherAI">
  <meta property="og:title" content="WeatherAI — Multi-Variable Forecasting System">
  <meta property="og:description" content="AI-powered weather forecasting dashboard using LSTM neural networks.">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  ${mainCssFile ? `<link rel="stylesheet" href="/assets/${mainCssFile}">` : ''}
</head>
<body>
  <div id="root"></div>
  ${mainJsFile ? `<script type="module" src="/assets/${mainJsFile}"><\/script>` : ''}
</body>
</html>`;

// Write index.html to public directory
fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);

// Copy assets directory to public
const publicAssetsDir = path.join(publicDir, 'assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy all asset files
fs.readdirSync(assetsDir).forEach(file => {
  const src = path.join(assetsDir, file);
  const dest = path.join(publicAssetsDir, file);
  fs.copyFileSync(src, dest);
});

console.log('✓ Generated index.html and copied assets to public/');
console.log(`  - Main JS: ${mainJsFile}`);
console.log(`  - Main CSS: ${mainCssFile}`);

