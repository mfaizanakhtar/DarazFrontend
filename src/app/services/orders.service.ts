import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends DataService {

  constructor(http:HttpClient) {
    super("api/orders",http);
  }
}
