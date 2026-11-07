import { Component, signal } from '@angular/core';
import { EarthquakeMapComponent } from './components/earthquake-map/earthquake-map';

@Component({
  imports: [EarthquakeMapComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('usa-earthquake-portal');
}
