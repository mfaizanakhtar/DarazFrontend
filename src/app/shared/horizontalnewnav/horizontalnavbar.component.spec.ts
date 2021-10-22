import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalnewnavbarComponent } from './horizontalnavbar.component';

describe('HorizontalnavbarComponent', () => {
  let component: HorizontalnewnavbarComponent;
  let fixture: ComponentFixture<HorizontalnewnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalnewnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalnewnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
