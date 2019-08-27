import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators'
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { of } from 'rxjs';
// import { OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectService{
    baseUrl:string='http://client.nomokoiw.beget.tech/task_manager/project/project.controller.php?';

    constructor(private router:Router, private http: HttpClient){  
    }

    public checkProjectUser(projectId){
        return this.http.get<boolean>(this.baseUrl + 'Key=check-project-user&ProjectId='+projectId).pipe(
            tap(
                res => {
                    console.log(res);
                    return of(res)
                }
            )
        );
    }

}