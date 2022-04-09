import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRenewalComponent } from './billing-renewal.component';

describe('BillingRenewalComponent', () => {
  let component: BillingRenewalComponent;
  let fixture: ComponentFixture<BillingRenewalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingRenewalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
