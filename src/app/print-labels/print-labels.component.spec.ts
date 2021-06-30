import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLabelsComponent } from './print-labels.component';

describe('PrintLabelsComponent', () => {
  let component: PrintLabelsComponent;
  let fixture: ComponentFixture<PrintLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
