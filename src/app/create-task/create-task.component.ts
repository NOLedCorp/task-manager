import { Component, OnInit } from '@angular/core';
import { TaskTypes, StatusTypes, PriorityTypes } from '../models/project.model';

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

  get statuses(){
    let result = [];
    for (const key in StatusTypes) {
      result.push({
        Name:StatusTypes[key]
      })
    }
    return result;
  }

  get types(){
    let result = [];
    for (const key in TaskTypes) {
      result.push({
        Name:TaskTypes[key]
      })
    }
    return result;
  }

  get priorities(){
    let result = [];
    for (const key in PriorityTypes) {
      result.push({
        Name:PriorityTypes[key]
      })
    }
    return result;
  }

}
