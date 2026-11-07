import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Earthquake } from './earthquake';

describe('Earthquake', () => {
  let service: Earthquake;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Earthquake, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Earthquake);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
