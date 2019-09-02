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
  showTasks: Task[] = [];
  showProjects: Project[] = [];
  isProjects = false;
  constructor(private route:ActivatedRoute, private ps:ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['projectId']){
        this.isProjects = false;
        this.getProjectTasks(params['projectId']);
      }else{
        this.isProjects = true;
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
      this.showProjects = JSON.parse(JSON.stringify(this.projects));
      console.log(this.showProjects)
      this.show(tasks[0].Id, null);
    })
  }

  show(id, e){
    if(!e || e.target.nodeName!='A' && e.target.nodeName!='H4'){
      this.shows[id]=!this.shows[id];
    }
    
  }

  applyFilters(tasks){
    console.log(tasks)
    if(this.isProjects){
      this.showProjects.forEach(p => {
        p.Tasks=tasks.filter(t => t.ProjectId == p.Id);
      });
      console.log(this.showProjects)
    }else{
      this.showTasks = tasks;
    }
    console.log(true)
    
  }

  get projectsTasks() {
    let result = [];
     this.projects.forEach(x => {
       result.push(...x.Tasks);
     })
     return result;
  }

}
