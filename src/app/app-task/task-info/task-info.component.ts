import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.less']
})
export class TaskInfoComponent implements OnInit {

  constructor(private ts:TaskService) { }

  ngOnInit() {
  }

}
