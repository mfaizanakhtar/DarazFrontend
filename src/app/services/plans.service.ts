import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlansService extends DataService {

  selectedPlan:any;
  billingAmount:Number;
  durationSelected:String;
  billingId:Number;
  renewalData
  constructor(http:HttpClient) {
    super("plans",http);
  }
  


}
