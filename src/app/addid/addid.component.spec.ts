import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddidComponent } from './addid.component';

describe('AddidComponent', () => {
  let component: AddidComponent;
  let fixture: ComponentFixture<AddidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
