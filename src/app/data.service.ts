import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
export class DataService {
  options:any
  constructor(private url : string, private http: HttpClient) { }

  setHeaders(){
    let token = localStorage.getItem('auth-token');
    let header = new HttpHeaders();
    header.append('auth-token',token);
    this.options = { header : header};
  }

  getAll(){
    this.setHeaders()
    return this.http.get(this.url,this.options).pipe(
      map(response=>response)
    )
  }

  get(caption){
    this.setHeaders()
    return this.http.get(this.url+caption,this.options).pipe(
      map(response=>response)
    )
  }

  getById(caption,id){
    this.setHeaders()
    return this.http.get(this.url+'/'+caption+'/'+id).pipe(
      map(response=>response)
    )
  }

  postData(data){
    this.setHeaders()
    return this.http.post(this.url,data).pipe(
      map(response=>response)
    )
  }

  updateData(caption,id,data){
    this.setHeaders()
    return this.http.put(this.url+'/'+caption+'/'+id,data).pipe(
      map(response=>response)
    )
  }
}
