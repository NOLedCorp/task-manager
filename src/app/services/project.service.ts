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
        return this.http.get<boolean>(this.baseUrl + 'Key=check-project-user&ProjectId='+projectId);
    }

    public getProject(projectId){
        return this.http.get<boolean>(this.baseUrl + 'Key=get-project&ProjectId='+projectId);
    }

    public getProjectTasks(projectId){
        return this.http.get<boolean>(this.baseUrl + 'Key=get-project-tasks&ProjectId='+projectId);
    }

    public getProjectReqs(projectId){
        return this.http.get<boolean>(this.baseUrl + 'Key=get-project-reqs&ProjectId='+projectId);
    }

    public getProjectTeam(projectId){
        return this.http.get<boolean>(this.baseUrl + 'Key=get-project-team&ProjectId='+projectId);
    }

}