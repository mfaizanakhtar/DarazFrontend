import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDropDownComponent } from './mat-drop-down.component';

describe('MatDropDownComponent', () => {
  let component: MatDropDownComponent;
  let fixture: ComponentFixture<MatDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
