import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { switchMap } from 'rxjs/internal/operators';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  project:Project;
  constructor(private route:ActivatedRoute, private ps:ProjectService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.get('projectId'))
    ).subscribe(data=> this.ps.getProject(+data).subscribe(project => {
      this.project = project;
    }));
  }

}
