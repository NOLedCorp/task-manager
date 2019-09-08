import { Component, OnInit } from '@angular/core';
import { TaskTypes } from '../models/project.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.less']
})
export class CreateTaskComponent implements OnInit {
  public type:TaskTypes = TaskTypes.Task;
  constructor() { }

  ngOnInit() {
    console.log(this.type)
  }

}
