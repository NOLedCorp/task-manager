import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { TaskTypes, StatusTypes, PriorityTypes } from 'src/app/models/project.model';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.less']
})
export class TaskInfoComponent implements OnInit {
  users: User[] = [];
  status = StatusTypes;
  constructor(private ts:TaskService, private ps:ProjectService) { }

  ngOnInit() {
    this.ps.getProjectTeam(this.ts.task.ProjectId).subscribe(team => {
      this.users = team;
    })
  }

  get statuses(){
    let result = [];
    for (const key in this.status) {
      result.push({
        Name:key
      })
    }
    return result;
  }
  get priorities(){
    let result = [];
    for (const key in PriorityTypes) {
      result.push({
        Name:key
      })
    }
    return result;
  }
}
