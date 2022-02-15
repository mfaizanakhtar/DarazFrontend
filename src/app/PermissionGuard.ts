import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class PermissionGuard implements CanActivate{
    constructor(private auth:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const permissions = this.auth.getPermissions()
        if(!permissions[route.data.page].value){
            this.router.navigate(['login'])
        }
        return true
    }
}