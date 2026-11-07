import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EarthquakeMap } from './earthquake-map';

describe('EarthquakeMap', () => {
  let component: EarthquakeMap;
  let fixture: ComponentFixture<EarthquakeMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthquakeMap],
    }).compileComponents();

    fixture = TestBed.createComponent(EarthquakeMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
