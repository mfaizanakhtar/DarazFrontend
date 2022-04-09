import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";



@Injectable()
export class signupSubscriptionGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(this.auth.isLoggedin()){
        debugger
        var subscription = this.auth.getSubscriptionDetail();
        if(subscription!=null && subscription.subscriptionType==null){
            this.router.navigate(['pricing'])
            return
        }else return true
    }
    this.router.navigate(['login'])
  }
}