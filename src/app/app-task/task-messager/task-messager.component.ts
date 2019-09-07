import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Message } from 'src/app/models/project.model';

@Component({
  selector: 'app-task-messager',
  templateUrl: './task-messager.component.html',
  styleUrls: ['./task-messager.component.less']
})
export class TaskMessagerComponent implements OnInit {
  messages:Message[] = [];
  constructor(private ps:ProjectService, private ts:TaskService) { }

  ngOnInit() {
    this.ps.getTaskMessages(this.ts.task.Id).subscribe(messages => {
      this.messages = messages;
    })
  }

}
