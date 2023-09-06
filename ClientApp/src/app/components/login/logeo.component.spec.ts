import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogeoComponent } from './logeo.component';

describe('LogeoComponent', () => {
  let component: LogeoComponent;
  let fixture: ComponentFixture<LogeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
