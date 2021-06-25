import { TestBed } from '@angular/core/testing';

import { AddidService } from './addid.service';

describe('AddidService', () => {
  let service: AddidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
