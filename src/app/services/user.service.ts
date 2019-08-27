import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators'
// import { OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService{
    baseUrl:string='http://client.nomokoiw.beget.tech/task_manager/user/user.controller.php?';

    constructor(private router:Router, private http: HttpClient){  
    }

    public getUserInfo(){
        return this.http.get<any>(this.baseUrl + 'Key=get-user-info');
    }
}