import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

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

  createTask(){
    this.ms.open(CreateTaskComponent);
  }

}
