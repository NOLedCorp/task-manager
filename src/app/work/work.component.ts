import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Task, TaskTypes } from '../models/project.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {
  tasks:Task[] = [];
  taskTypes = TaskTypes;
  constructor(private route:ActivatedRoute, private ps:ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['projectId']){
        this.getProjectTasks(params['projectId']);
      }else{
        this.getTasks();
      }
    })
  }

  getProjectTasks(id){
    this.ps.getProjectTasks(id).subscribe(tasks => {
      this.tasks = tasks;
      console.log(tasks);
    })
  }

  getTasks(){

  }

}
