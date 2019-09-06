import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Requirement } from '../../models/project.model';

@Component({
  selector: 'work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.less']
})
export class WorkItemComponent implements OnInit {
  @Input() item: Task | Requirement;
  @Output('click') onClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  click(){
    this.onClick.emit(true);
  }

}
