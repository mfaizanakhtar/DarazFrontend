import { TestBed } from '@angular/core/testing';

import { DarazskuService } from './darazsku.service';

describe('DarazskuService', () => {
  let service: DarazskuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarazskuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
