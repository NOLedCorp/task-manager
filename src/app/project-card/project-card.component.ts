import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.less']
})
export class ProjectCardComponent implements OnInit {
  @Input() item: Project;
  constructor() { }

  ngOnInit() {
  }

}
