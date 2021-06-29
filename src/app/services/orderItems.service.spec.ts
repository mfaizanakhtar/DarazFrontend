import { TestBed } from '@angular/core/testing';

import { OrderItemsService } from './orderItems.service';

describe('OrdersService', () => {
  let service: OrderItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
