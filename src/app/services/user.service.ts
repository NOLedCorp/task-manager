import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators'
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
// import { OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService{
    baseUrl:string='http://client.nomokoiw.beget.tech/task_manager/user/user.controller.php?';

    constructor(private router:Router, private http: HttpClient){  
    }

    public getUserInfo(){
        return this.http.get<User>(this.baseUrl + 'Key=get-user-info');
    }

    public getUserProjects(){
        return this.http.get<Project[]>(this.baseUrl + 'Key=get-user-projects');
    }

    public checkUserId(id): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + 'Key=check-user-id&Id='+id);
    }
}