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
  // private baseUrl="http://localhost:3000/api/"
  // private baseUrl="http://dmanage.accesology.com/api/"
  private baseUrl="api/"
  async setHeaders(){
    let token = localStorage.getItem('auth-token');
    let header = new HttpHeaders();
    let authHeader = header.set('auth-token',token)
    this.options = { headers : authHeader};
  }

  getAll(){
    this.setHeaders()
    return this.http.get(this.baseUrl+this.url,this.options).pipe(
      map(response=>response)
    )
  }

  get(caption){
    this.setHeaders()
    return this.http.get(this.baseUrl+this.url+caption,this.options).pipe(
      map(response=>response)
    )
  }

  getWithoutHeaders(caption){
    return this.http.get(this.baseUrl+this.url+caption,this.options).pipe(
      map(response=>response)
    )
  }

  getById(caption,id){
    this.setHeaders()
    console.log(this.options)
    return this.http.get(this.baseUrl+this.url+'/'+caption+'/'+id,this.options).pipe(
      map(response=>response)
    )
  }

  postData(data){
    this.setHeaders()
    return this.http.post(this.baseUrl+this.url,data,this.options).pipe(
      map(response=>response)
    )
  }

  postDataByCap(cap,data){
    this.setHeaders()
    return this.http.post(this.baseUrl+this.url+cap,data,this.options).pipe(
      map(response=>response)
    )
  }

  postDataWithoutHeaders(cap,data){
    return this.http.post(this.baseUrl+this.url+cap,data,this.options).pipe(
      map(response=>response)
    )
  }

  updateDataWithoutHeaders(caption,id,data){
    return this.http.put(this.baseUrl+this.url+'/'+caption+'/'+id,data,this.options).pipe(
      map(response=>response)
    )
  }

  updateData(caption,id,data){
    this.setHeaders()
    return this.http.put(this.baseUrl+this.url+'/'+caption+'/'+id,data,this.options).pipe(
      map(response=>response)
    )
  }

  deleteData(id){
    this.setHeaders()
    return this.http.delete(this.baseUrl+this.url+id,this.options).pipe(
      map(response=>response)
    )
  }

  deleteDataByCap(caption,id){
    this.setHeaders()
    return this.http.delete(this.baseUrl+this.url+'/'+caption+'/'+id,this.options).pipe(
      map(response=>response)
    )
  }
}
