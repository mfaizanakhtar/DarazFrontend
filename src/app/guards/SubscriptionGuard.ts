import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from '../utils/constants';



@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(this.auth.isLoggedin()){
        debugger
        var subscription = this.auth.getSubscriptionDetail();
        if(subscription!=null && (subscription.subscriptionType==null)){
            this.router.navigate(['pricing'])
            return
        }
        else if(subscription!=null && !(new Date(subscription.endDate)>new Date())){
            this.router.navigate(['pages/expired'])
            return;
        }
        else return true
    }
    this.router.navigate(['login'])
  }
}