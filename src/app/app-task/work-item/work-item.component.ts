import { Component, OnInit, Input } from '@angular/core';
import { Task, Requirement } from '../../models/project.model';

@Component({
  selector: 'work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.less']
})
export class WorkItemComponent implements OnInit {
  @Input() item: Task | Requirement;
  constructor() { }

  ngOnInit() {
  }

}
