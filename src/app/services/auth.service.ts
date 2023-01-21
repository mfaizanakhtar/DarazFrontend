import { BillingService } from './billing.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  result:any
  subscriptionDetail:any
  constructor(private http:HttpClient,private billing:BillingService) { }
  private baseURL=isDevMode() ? "http://localhost:3000/api/" : "api/"
  // private baseURL="http://13.235.80.238/api/"
  // private baseURL="api/"

  login(credentials)
  {
    
    return this.http.post(this.baseURL+'auth',credentials).pipe(
    map(response=>{
      
      this.result = response;
      
      if(this.result && this.result.token){
        localStorage.setItem('auth-token',this.result.token);
        return true;
      }
      return false;
    })
    )
  }


  logout(){
    localStorage.removeItem('auth-token');
  }

  isLoggedin(){
    let token = localStorage.getItem('auth-token');
    if(!token) return false
    
    let isExpired = new JwtHelperService().isTokenExpired(token);
    return !isExpired
  }

  getCurrentUser(){
    let token = localStorage.getItem('auth-token');
    let user = new JwtHelperService().decodeToken(token);
    if(!user){
      return {}
    }
    return user;
  }

  getPermissions(){
    if(this.getCurrentUser().permissions){
      return this.getCurrentUser().permissions
    }
    return {}
  }

  public setSubscriptionDetails(){
      return this.billing.get('/getSubscriptionDetail').pipe(map(res=>{
      localStorage.setItem('subscriptionDetail',JSON.stringify(res))
    }))
  }

  public getSubscriptionDetail(){
    return JSON.parse(localStorage.getItem('subscriptionDetail'))
  }
}
