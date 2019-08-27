import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators'
import { User } from '../models/user.model';
import { Project, Requirement, Task, ProjectUser } from '../models/project.model';
import { of, Observable } from 'rxjs';
// import { OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GitHubService{
    baseUrl:string='https://api.github.com/repos/NOLedCorp/';

    constructor(private router:Router, private http: HttpClient){ 
    }

    public getCommits(projectRep): Observable<any>{
        return this.http.get<any>(this.baseUrl +projectRep+'/commits');
    }

    public getPulls(projectRep): Observable<any>{
        return this.http.get<any>(this.baseUrl +projectRep+'/pulls');
    }

    public getForks(projectRep): Observable<any>{
        return this.http.get<any>(this.baseUrl +projectRep+'/forks');
    }

    public getContributers(projectRep): Observable<any>{
        return this.http.get<any>(this.baseUrl +projectRep+'/stats/contributors');
    }

}