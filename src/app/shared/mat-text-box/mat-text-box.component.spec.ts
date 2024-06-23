import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTextBoxComponent } from './mat-text-box.component';

describe('MatTextBoxComponent', () => {
  let component: MatTextBoxComponent;
  let fixture: ComponentFixture<MatTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
