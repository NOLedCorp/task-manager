import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CreateLinkComponent } from 'src/app/create-link/create-link.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-links',
  templateUrl: './task-links.component.html',
  styleUrls: ['./task-links.component.less']
})
export class TaskLinksComponent implements OnInit {
  shows:{other:boolean, parent:boolean} = {other:true, parent:true};
  constructor(private ms:ModalService, private ts:TaskService) { }

  ngOnInit() {
  }

  show(id){
    this.shows[id]=!this.shows[id];
  }

  createLink(){
    this.ms.open(CreateLinkComponent, 'Добавление ссылки', {taskId: this.ts.task.Id});
  }
  
}
