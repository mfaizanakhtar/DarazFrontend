import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomStatusFilterComponent } from './add-edit-custom-status-filter.component';

describe('AddEditCustomStatusFilterComponent', () => {
  let component: AddEditCustomStatusFilterComponent;
  let fixture: ComponentFixture<AddEditCustomStatusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCustomStatusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCustomStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
