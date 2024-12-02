import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeworkPage } from './homework.page';

describe('HomeworkPage', () => {
  let component: HomeworkPage;
  let fixture: ComponentFixture<HomeworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
