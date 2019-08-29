import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  user = null;
  show: boolean = false;
  constructor(private router:Router) { }

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

}
