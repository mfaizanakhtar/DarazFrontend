import { TestBed } from '@angular/core/testing';

import { UpdateordersService } from './updateorders.service';

describe('UpdateordersService', () => {
  let service: UpdateordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
