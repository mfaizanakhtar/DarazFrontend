import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingService extends DataService{

  constructor(http:HttpClient) {
    super('billings',http);
  }

}
