import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypeOrderPayoutComponent } from './filter-type-order-payout.component';

describe('FilterTypeOrderPayoutComponent', () => {
  let component: FilterTypeOrderPayoutComponent;
  let fixture: ComponentFixture<FilterTypeOrderPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypeOrderPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypeOrderPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
