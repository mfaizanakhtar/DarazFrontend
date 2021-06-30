import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelstestComponent } from './labelstest.component';

describe('LabelstestComponent', () => {
  let component: LabelstestComponent;
  let fixture: ComponentFixture<LabelstestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelstestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
