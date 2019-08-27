import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent implements OnInit {
  projects:Project[];
  constructor(private route:ActivatedRoute, private us:UserService) { 
    this.us.getUserProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

  ngOnInit() {
  }

}
