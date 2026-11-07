import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/earthquake';

@Injectable({ providedIn: 'root' })
export class Earthquake {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

  getLastFiveDays(): Observable<ApiResponse> {
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const startDate = fiveDaysAgo.toISOString().split('T')[0];
    const endDate = now.toISOString().split('T')[0];

    const params = new HttpParams()
      .set('format', 'geojson')
      .set('starttime', startDate)
      .set('endtime', endDate)
      .set('orderby', 'time')
      .set('minlatitude', '24.5')
      .set('maxlatitude', '49.5')
      .set('minlongitude', '-125')
      .set('maxlongitude', '-66.5')
      .set('minmagnitude', '2.0');

    return this.http.get<ApiResponse>(this.baseUrl, { params });
  }
}
