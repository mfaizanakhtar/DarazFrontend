import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuEditSheetComponent } from './sku-edit-sheet.component';

describe('SkuEditSheetComponent', () => {
  let component: SkuEditSheetComponent;
  let fixture: ComponentFixture<SkuEditSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuEditSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuEditSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
