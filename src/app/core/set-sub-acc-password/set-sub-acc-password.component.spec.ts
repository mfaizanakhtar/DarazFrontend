import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSubAccPasswordComponent } from './set-sub-acc-password.component';

describe('SetSubAccPasswordComponent', () => {
  let component: SetSubAccPasswordComponent;
  let fixture: ComponentFixture<SetSubAccPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSubAccPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSubAccPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
