import { TestBed } from '@angular/core/testing';

import { DzapiService } from './dzapi.service';

describe('DzapiService', () => {
  let service: DzapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DzapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
