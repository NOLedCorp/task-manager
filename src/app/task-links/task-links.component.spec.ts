import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLinksComponent } from './task-links.component';

describe('TaskLinksComponent', () => {
  let component: TaskLinksComponent;
  let fixture: ComponentFixture<TaskLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
