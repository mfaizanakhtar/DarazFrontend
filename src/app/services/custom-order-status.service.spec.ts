import { TestBed } from '@angular/core/testing';

import { CustomOrderStatusService } from './custom-order-status.service';

describe('CustomOrderStatusService', () => {
  let service: CustomOrderStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOrderStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
