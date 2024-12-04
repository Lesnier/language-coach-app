import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeworksPage } from './homeworks.page';

describe('HomeworksPage', () => {
  let component: HomeworksPage;
  let fixture: ComponentFixture<HomeworksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
