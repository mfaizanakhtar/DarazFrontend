import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService extends DataService {
  constructor(http:HttpClient) {
    super("users",http)
   }

}
