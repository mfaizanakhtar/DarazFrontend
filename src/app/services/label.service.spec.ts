import { TestBed } from '@angular/core/testing';

import { LabelService } from './label.service';

describe('LabelServiceService', () => {
  let service: LabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
