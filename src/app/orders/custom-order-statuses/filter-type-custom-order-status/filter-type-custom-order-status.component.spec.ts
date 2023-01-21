import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypeCustomOrderStatusComponent } from './filter-type-custom-order-status.component';

describe('FilterTypeCustomOrderStatusComponent', () => {
  let component: FilterTypeCustomOrderStatusComponent;
  let fixture: ComponentFixture<FilterTypeCustomOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypeCustomOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypeCustomOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
