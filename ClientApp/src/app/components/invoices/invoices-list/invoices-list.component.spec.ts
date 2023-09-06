import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesListComponent } from './invoices-list.component';

describe('InvoicesListComponent', () => {
  let component: InvoicesListComponent;
  let fixture: ComponentFixture<InvoicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesListComponent]
    });
    fixture = TestBed.createComponent(InvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
