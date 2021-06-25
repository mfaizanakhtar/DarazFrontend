import { TestBed } from '@angular/core/testing';

import { UseremailService } from './useremail.service';

describe('UseremailService', () => {
  let service: UseremailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseremailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
