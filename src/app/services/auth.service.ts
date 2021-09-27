import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  result:any
  constructor(private http:HttpClient) { }
  // private baseURL="http://localhost:3000/api/"
  private baseURL="http://dmanage.accesology.com/api/"
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
      return null
    }
    return user;
  }
}
