import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectUser } from '../models/project.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {
  team:ProjectUser[] = [];
  constructor(private route:ActivatedRoute, private ps:ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['projectId']){
        this.ps.getProjectTeam(params['projectId']).subscribe(team => {
          this.team = team;
        })
      }
    })
  }

}
