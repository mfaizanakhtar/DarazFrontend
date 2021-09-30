import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DscSkuEditComponent } from './dsc-sku-edit.component';

describe('DscSkuEditComponent', () => {
  let component: DscSkuEditComponent;
  let fixture: ComponentFixture<DscSkuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DscSkuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DscSkuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
