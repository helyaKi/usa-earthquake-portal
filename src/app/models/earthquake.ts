// src/app/models/earthquake.ts

// Top level response
export interface ApiResponse {
  type: 'FeatureCollection';
  metadata: ResponseMetadata;
  features: EarthquakeFeature[];
}

export interface ResponseMetadata {
  generated: number;
  url: string;
  title: string;
  count: number;
}

export interface EarthquakeFeature {
  type: 'Feature';
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
  id: string;
}

export interface EarthquakeProperties {
  mag: number | null;
  place: string;
  time: number;
  url: string;
  title: string;
}

export interface EarthquakeGeometry {
  type: 'Point';
  coordinates: [longitude: number, latitude: number, depth: number];
}
