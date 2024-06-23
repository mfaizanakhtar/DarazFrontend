import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatusFiltersComponent } from './view-status-filters.component';

describe('ViewStatusFiltersComponent', () => {
  let component: ViewStatusFiltersComponent;
  let fixture: ComponentFixture<ViewStatusFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStatusFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
