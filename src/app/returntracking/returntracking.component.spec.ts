import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturntrackingComponent } from './returntracking.component';

describe('ReturntrackingComponent', () => {
  let component: ReturntrackingComponent;
  let fixture: ComponentFixture<ReturntrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturntrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturntrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
