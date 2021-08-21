import { TestBed } from '@angular/core/testing';

import { SkusService } from './skus.service';

describe('SkusService', () => {
  let service: SkusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
