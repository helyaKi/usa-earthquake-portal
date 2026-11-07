// earthquake-map.ts

import { Component, afterNextRender, OnDestroy, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, startWith, map } from 'rxjs';
import * as L from 'leaflet';

import { Earthquake } from '../../services/earthquake';
import { EarthquakeFeature } from '../../models/earthquake';
import { AsyncState } from '../../models/async-state';
import { environment } from '../../../environments/environment';

type EarthquakeState = AsyncState<EarthquakeFeature[]>;

@Component({
  selector: 'app-earthquake-map',
  standalone: true,
  templateUrl: './earthquake-map.html',
  styleUrl: './earthquake-map.css',
})
export class EarthquakeMapComponent implements OnDestroy {
  private readonly earthquakeService = inject(Earthquake);

  private map: L.Map | null = null;

  readonly dataState = toSignal(
    this.earthquakeService.getLastFiveDays().pipe(
      map((response): EarthquakeState => ({
        status: 'success' as const,
        data: response.features,
      })),
      catchError((err) =>
        of<EarthquakeState>({
          status: 'error' as const,
          message: err?.message ?? 'Could not reach the USGS earthquake service.',
        }),
      ),
      startWith({ status: 'loading' as const } as EarthquakeState),
    ),
    { requireSync: true },
  );

  readonly isLoading = computed(() => this.dataState().status === 'loading');

  readonly errorMessage = computed(() => {
    const state = this.dataState();
    return state.status === 'error' ? state.message : '';
  });

  readonly hasError = computed(() => this.dataState().status === 'error');

  readonly earthquakeCount = computed(() => {
    const state = this.dataState();
    return state.status === 'success' ? state.data.length : 0;
  });

  constructor() {
    afterNextRender(() => this.initMap());
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.5, -98.5],
      zoom: 4,
      minZoom: 3,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

    L.tileLayer(
      `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(environment.cartoApiKey)}`,
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
          'contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      },
    ).addTo(this.map);

    const tryDraw = (): void => {
      const state = this.dataState();
      if (state.status === 'success') {
        this.drawMarkers(state.data);
        return;
      }
      if (state.status === 'error') {
        return;
      }

      const id = setInterval(() => {
        const s = this.dataState();
        if (s.status === 'success') {
          clearInterval(id);
          this.drawMarkers(s.data);
        } else if (s.status === 'error') {
          clearInterval(id);
        }
      }, 200);
    };
    tryDraw();
  }

  private drawMarkers(features: EarthquakeFeature[]): void {
    if (!this.map) return;

    for (const feature of features) {
      const { properties, geometry } = feature;
      const [lng, lat, depth] = geometry.coordinates;
      const mag = properties.mag ?? 0;

      const radius = Math.max(3, mag * mag);

      const marker = L.circleMarker([lat, lng], {
        radius,
        fillColor: 'rgb(74, 222, 128)',
        fillOpacity: 1,
        color: 'rgb(74, 222, 128)',
        className: 'shadow-marker',
        weight: 1.5,
      }).addTo(this.map!);

      const formattedDate = new Date(properties.time).toLocaleString();
      const tooltipHtml = `
        <div class="eq-tooltip">
          <strong>${properties.place ?? 'Unknown location'}</strong><br/>
          Magnitude: <strong>${mag.toFixed(1)}</strong><br/>
          Depth: ${depth.toFixed(1)} km<br/>
          Date: ${formattedDate}<br/>
          Coords: ${lat.toFixed(3)}°N, ${Math.abs(lng).toFixed(3)}°W
        </div>
      `;

      marker.bindTooltip(tooltipHtml, {
        direction: 'top',
        className: 'dark-tooltip',
        sticky: true,
      });

      marker.on('mouseover', () => marker.openTooltip());
      marker.on('mouseout', () => marker.closeTooltip());
    }
  }
}
