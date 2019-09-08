import { Component, OnInit } from '@angular/core';
import { ProjectStatus, ProjectType } from '../models/project.model';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less']
})
export class CreateProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get statuses(){
    let result = [];
    for (const key in ProjectStatus) {
      result.push({
        Name:ProjectStatus[key]
      })
    }
    return result;
  }

  get types(){
    let result = [];
    for (const key in ProjectType) {
      result.push({
        Name:ProjectType[key]
      })
    }
    return result;
  }

}
