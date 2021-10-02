import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAnalyticsComponent } from './profit-analytics.component';

describe('ProfitAnalyticsComponent', () => {
  let component: ProfitAnalyticsComponent;
  let fixture: ComponentFixture<ProfitAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
