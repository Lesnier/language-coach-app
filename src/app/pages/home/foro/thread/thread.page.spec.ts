import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadPage } from './thread.page';

describe('ThreadPage', () => {
  let component: ThreadPage;
  let fixture: ComponentFixture<ThreadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
