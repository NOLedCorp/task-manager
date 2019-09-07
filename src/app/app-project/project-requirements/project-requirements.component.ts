import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Requirement } from '../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.less']
})
export class ProjectRequirementsComponent implements OnInit {
  reqs: Requirement[] = [];
  constructor(private ps:ProjectService, private ts:TaskService, private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.get('projectId'))
    ).subscribe(data=> this.ps.getProjectReqs(+data).subscribe(reqs => {
      this.reqs = reqs;
    }));
  }

  open(tasks, id){
    this.ts.setIdList(tasks.map(x => x.Id), id);
  }

}
