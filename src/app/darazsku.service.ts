import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarazskuService extends DataService {

  constructor(http:HttpClient) {
    super('darazskus',http);
  }
}
