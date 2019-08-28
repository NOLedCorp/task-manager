import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Task, TaskTypes, Project } from '../models/project.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {
  tasks:Task[] = [];
  projects:Project[] = [];
  taskTypes = TaskTypes;
  shows:any = {};
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
      
    })
  }

  getTasks(){
    this.ps.getTasks().subscribe(tasks => {
      this.projects = tasks;
      this.show(tasks[0].Id, null);
    })
  }

  show(id, e){
    if(!e || e.target.nodeName!='A' && e.target.nodeName!='H4'){
      this.shows[id]=!this.shows[id];
    }
    
  }

}
