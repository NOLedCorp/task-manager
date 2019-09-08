import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { TaskTypes } from '../models/project.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  user = null;
  show: boolean = false;
  constructor(private router:Router, private ms:ModalService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
  }

  toggleShow(){
    this.show = !this.show;
  }

  exit(){
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
    this.router.navigate(['/auth']);
  }

  createProject(){
    this.ms.open(CreateProjectComponent, 'Создание проекта');
  }

  createTask(req = false){
    if(req){
      this.ms.open(CreateTaskComponent, 'Создание требования', {type: TaskTypes.Requirement});
    }else{
      this.ms.open(CreateTaskComponent, 'Создание задачи');
    }
    
  }

}
