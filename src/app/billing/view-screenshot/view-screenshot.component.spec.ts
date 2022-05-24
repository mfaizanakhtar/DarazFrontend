import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScreenshotComponent } from './view-screenshot.component';

describe('ViewScreenshotComponent', () => {
  let component: ViewScreenshotComponent;
  let fixture: ComponentFixture<ViewScreenshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScreenshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
