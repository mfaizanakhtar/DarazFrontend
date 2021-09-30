import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnedStockComponent } from './add-returned-stock.component';

describe('AddReturnedStockComponent', () => {
  let component: AddReturnedStockComponent;
  let fixture: ComponentFixture<AddReturnedStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnedStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
