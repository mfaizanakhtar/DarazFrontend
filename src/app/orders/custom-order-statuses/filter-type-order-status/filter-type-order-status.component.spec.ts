import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypeOrderStatusComponent } from './filter-type-order-status.component';

describe('FilterTypeOrderStatusComponent', () => {
  let component: FilterTypeOrderStatusComponent;
  let fixture: ComponentFixture<FilterTypeOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypeOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypeOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
