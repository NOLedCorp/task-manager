import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators'
import { User } from '../models/user.model';
import { Project, Requirement, Task, ProjectUser } from '../models/project.model';
import { of, Observable } from 'rxjs';
// import { OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectService{
    baseUrl:string='http://client.nomokoiw.beget.tech/task_manager/project/project.controller.php?';

    constructor(private router:Router, private http: HttpClient){
    }

    public checkProjectUser(projectId): Observable<boolean>{
        return this.http.get<boolean>(this.baseUrl + 'Key=check-project-user&ProjectId='+projectId);
    }

    public getProject(projectId):Observable<Project>{
        return this.http.get<Project>(this.baseUrl + 'Key=get-project&ProjectId='+projectId);
    }

    public getProjectTasks(projectId): Observable<Task[]> {
        return this.http.get<Task[]>(this.baseUrl + 'Key=get-project-tasks&ProjectId='+projectId);
    }

    public getProjectUsers(projectId): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'Key=get-project-users&ProjectId='+projectId);
    }


    public getProjectReqs(projectId): Observable<Requirement[]> {
        return this.http.get<Requirement[]>(this.baseUrl + 'Key=get-project-reqs&ProjectId='+projectId);
    }

    public getProjectTeam(projectId): Observable<ProjectUser[]> {
        return this.http.get<ProjectUser[]>(this.baseUrl + 'Key=get-project-team&ProjectId='+projectId);
    }

    public getTasks(): Observable<Project[]> {
        return this.http.get<Project[]>(this.baseUrl + 'Key=get-tasks');
    }
    public getTask(taskId): Observable<Task> {
        return this.http.get<Task>(this.baseUrl + 'Key=get-task&TaskId='+taskId);
    }

    //------------------Изменение----------------
    public updateTask(task): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'Key=update-task', task);
    }

}