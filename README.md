# USA Earthquake Portal

An Angular application that shows recent earthquake activity in the United States on an interactive map. Data comes from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/) and covers the **last 5 days**.

## Features

- Interactive [Leaflet](https://leafletjs.com/) map centered on the USA, with a dark CARTO basemap
- Each earthquake is drawn as a circle sized by magnitude
- Hover tooltips show location, magnitude, depth, date/time and coordinates
- Loading and error overlays while data is fetched

## Tech stack

- Angular 22 (standalone components, signals)
- Leaflet 1.9
- RxJS
- Font Awesome icons
- Vitest for unit tests

## Project structure

```
src/
├── app/
│   ├── components/earthquake-map/   # Map component (Leaflet setup, markers, tooltips)
│   ├── models/earthquake.ts         # GeoJSON earthquake types
│   ├── services/earthquake.ts       # Fetches data from the USGS API
│   ├── app.ts / app.html / app.css  # Root component and layout
├── environments/                    # Environment configuration
└── styles.css                       # Global styles and theme variables
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (a version supported by Angular 22)
- npm
- [Angular CLI](https://angular.dev/tools/cli) installed globally: `npm install -g @angular/cli`

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
ng serve
```

(Or `npm start`, which runs `ng serve` using the project's local Angular CLI.)

Open `http://localhost:4200/` in your browser. The app reloads automatically when you change source files.

## Building

```bash
ng build
```

(Or `npm run build`.)

Build output is written to the `dist/` directory. The default configuration is a production build.

## Running unit tests

```bash
ng test
```

(Or `npm test`.)

Tests run with [Vitest](https://vitest.dev/).

## Data source

Earthquake data is provided by the U.S. Geological Survey (USGS) GeoJSON feeds. Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors © [CARTO](https://carto.com/).
