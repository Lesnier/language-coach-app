import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsListPage } from './payments-list.page';

describe('HomeworksPage', () => {
  let component: PaymentsListPage;
  let fixture: ComponentFixture<PaymentsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
