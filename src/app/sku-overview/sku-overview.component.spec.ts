import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuOverviewComponent } from './sku-overview.component';

describe('SkuOverviewComponent', () => {
  let component: SkuOverviewComponent;
  let fixture: ComponentFixture<SkuOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
