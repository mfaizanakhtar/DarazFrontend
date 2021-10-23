import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginupdateComponent } from './loginupdate.component';

describe('LoginupdateComponent', () => {
  let component: LoginupdateComponent;
  let fixture: ComponentFixture<LoginupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
