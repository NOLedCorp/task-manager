import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { map, catchError } from 'rxjs/internal/operators';

export class ProjectGuard implements CanActivate{
    
    constructor( private ps:ProjectService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        return this.ps.checkProjectUser(route.params['projectId']).pipe(
            map(res => {
                if(res){
                    return true;
                }else{
                    return false;
                }
            }),
             catchError(err => {
                 return of(false);
             })
        )
    }
}