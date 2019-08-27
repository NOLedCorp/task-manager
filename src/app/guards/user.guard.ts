import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, catchError } from 'rxjs/internal/operators';

export class UserGuard implements CanActivate{
 
    constructor( private us:UserService, private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         if(sessionStorage.getItem('userToken')){
            return this.us.checkUserId(route.params['userId']).pipe(
                map(res => {
                    if(res){
                        return true;
                    }else{
                        sessionStorage.removeItem('userToken');
                        sessionStorage.removeItem('userInfo');
                        this.router.navigate(['/auth']);
                        return false;
                    }
                })
            )
         }else{
             return false;
         }
    }
}