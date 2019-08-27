import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

export class UserGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         if(sessionStorage.getItem('userToken')){
             return true;
         }else{
             return false;
         }
        return confirm('Вы уверены, что хотите перейти?');
    }
}