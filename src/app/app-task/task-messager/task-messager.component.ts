import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Message } from 'src/app/models/project.model';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task-messager',
  templateUrl: './task-messager.component.html',
  styleUrls: ['./task-messager.component.less']
})
export class TaskMessagerComponent implements OnInit {
  messages:Message[] = [];
  text:string = '';
  user:User = null;
  constructor(private ps:ProjectService, private ts:TaskService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.ps.getTaskMessages(this.ts.task.Id).subscribe(messages => {
      this.messages = messages;
    })
  }

  addMessage(){
    if(0==this.text.length && this.text.length<501 || !this.user){
      return;
    }
    this.ps.addMessage({
      UserId: this.user.Id,
      Text: this.text,
      TaskId: this.ts.task.Id
    }).subscribe(message => {
      this.messages.push(message);
      this.text = '';
    },
  error => {
    console.log(error.message)
  })
  }

}
