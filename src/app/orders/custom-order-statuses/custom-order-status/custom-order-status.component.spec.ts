import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOrderStatusComponent } from './custom-order-status.component';

describe('CustomOrderStatusComponent', () => {
  let component: CustomOrderStatusComponent;
  let fixture: ComponentFixture<CustomOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
