import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheckComponent } from './email-check.component';

describe('EmailCheckComponent', () => {
  let component: EmailCheckComponent;
  let fixture: ComponentFixture<EmailCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
