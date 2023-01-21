import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypeDateRangeComponent } from './filter-type-date-range.component';

describe('FilterTypeDateRangeComponent', () => {
  let component: FilterTypeDateRangeComponent;
  let fixture: ComponentFixture<FilterTypeDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypeDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypeDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
