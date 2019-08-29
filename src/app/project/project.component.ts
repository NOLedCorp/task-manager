import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { switchMap, tap } from 'rxjs/internal/operators';
import { Project } from '../models/project.model';
import { forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  project:Project;
  projects:Project[];
  show:boolean = false;
  constructor(private ls:LoadService, private route:ActivatedRoute, private ps:ProjectService, private us:UserService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.get('projectId'))
    ).subscribe(data=> this.init(+data));
  }

  init(id){
    this.ls.showLoad = true;
    forkJoin([
      this.ps.getProject(id),
      this.us.getUserProjects()
    ]).pipe(
      tap(x => {
        [this.project, this.projects] = x;
        this.ls.showLoad = false;
      })
    ).subscribe()
  }

  toggleProjects(){
    this.show = !this.show;
  }

}
