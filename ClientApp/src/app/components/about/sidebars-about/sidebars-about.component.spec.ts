import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarsAboutComponent } from './sidebars-about.component';

describe('SidebarsAboutComponent', () => {
  let component: SidebarsAboutComponent;
  let fixture: ComponentFixture<SidebarsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarsAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
