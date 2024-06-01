import { TestBed } from '@angular/core/testing';

import { OrdencargaService } from './ordencarga.service';

describe('OrdencargaService', () => {
  let service: OrdencargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdencargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
