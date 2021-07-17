import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UseremailService extends DataService {

  constructor(http:HttpClient) {
    super("api/users",http)
   }
}
