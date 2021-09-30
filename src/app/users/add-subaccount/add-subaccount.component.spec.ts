import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubaccountComponent } from './add-subaccount.component';

describe('AddSubaccountComponent', () => {
  let component: AddSubaccountComponent;
  let fixture: ComponentFixture<AddSubaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
