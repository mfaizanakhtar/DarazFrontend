import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatementsComponent } from './view-statements.component';

describe('ViewStatementsComponent', () => {
  let component: ViewStatementsComponent;
  let fixture: ComponentFixture<ViewStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
