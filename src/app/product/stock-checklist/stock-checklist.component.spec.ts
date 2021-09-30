import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChecklistComponent } from './stock-checklist.component';

describe('StockChecklistComponent', () => {
  let component: StockChecklistComponent;
  let fixture: ComponentFixture<StockChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
