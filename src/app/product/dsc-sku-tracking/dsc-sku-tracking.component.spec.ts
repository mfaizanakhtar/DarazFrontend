import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DscSkuTracking } from './dsc-sku-tracking.component';

describe('DscSkuTracking', () => {
  let component: DscSkuTracking;
  let fixture: ComponentFixture<DscSkuTracking>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DscSkuTracking ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DscSkuTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
