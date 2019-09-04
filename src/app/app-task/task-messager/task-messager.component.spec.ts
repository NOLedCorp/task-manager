import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMessagerComponent } from './task-messager.component';

describe('TaskMessagerComponent', () => {
  let component: TaskMessagerComponent;
  let fixture: ComponentFixture<TaskMessagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMessagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMessagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
