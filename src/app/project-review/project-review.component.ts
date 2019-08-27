import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubService } from '../services/github.service';
import { switchMap } from 'rxjs/internal/operators';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-project-review',
  templateUrl: './project-review.component.html',
  styleUrls: ['./project-review.component.less']
})
export class ProjectReviewComponent implements OnInit {
  project:Project = null;
  info:{
    commits?:any;
    pulls?:any;
    forks?:any;
    contributors?:any;
  };
  constructor(private route:ActivatedRoute, private github:GitHubService, private ps:ProjectService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.get('projectId'))
    ).subscribe(data=> this.ps.getProject(+data).subscribe(project => {
      this.project = project;
      this.init();
    }));
  }

  init(){
    let rep = this.project.GitHubLink.split('/')[4];
    rep.replace('.git','');
    forkJoin([
      this.github.getCommits(rep),
      this.github.getPulls(rep),
      this.github.getForks(rep),
      this.github.getContributers(rep)
    ]).subscribe(response => {

      this.info = {
        commits: response[0],
        pulls:response[1],
        forks:response[2],
        contributors: response[3]
      }
    })
  }

}
