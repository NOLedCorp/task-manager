import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  client_id = "6833515";
  redirect_uri="http://client.nomokoiw.beget.tech/task_manager/auth.controller.php";
  display="popup";
  response_type="code";

  constructor(route: ActivatedRoute, router:Router, us:UserService) {
    // sessionStorage.removeItem('userToken');
    if(sessionStorage.getItem('userToken')){
      us.getUserInfo()
      .pipe(
        tap(info => {
          if(info){
            sessionStorage.setItem('userInfo', JSON.stringify(info));
            router.navigate(['user', info.Id]);
          }else{
            sessionStorage.removeItem('userToken');
          }
          
        })
      )
      .subscribe()
    }
    route.queryParams.subscribe(x => {
      if(x.token){
        sessionStorage.setItem('userToken', x.token);
        us.getUserInfo()
        .pipe(
          tap(info => {
            if(info){

              sessionStorage.setItem('userInfo', JSON.stringify(info));
              router.navigate(['user', info.Id]);
            }else{
              sessionStorage.removeItem('userToken');
            }
          })
        )
        .subscribe()
        
      }
    })
  }

  ngOnInit() {
  }



  
  getHref(){

    return encodeURI(`https://oauth.vk.com/authorize?client_id=${this.client_id}&display=${this.display}&response_type=${this.response_type}&v=5.101&redirect_uri=${this.redirect_uri}`);

  }

}
