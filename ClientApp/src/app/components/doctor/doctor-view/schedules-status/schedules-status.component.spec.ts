import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesStatusComponent } from './schedules-status.component';

describe('SchedulesStatusComponent', () => {
  let component: SchedulesStatusComponent;
  let fixture: ComponentFixture<SchedulesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
