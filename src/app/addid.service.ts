import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddidService extends DataService {

  constructor(http : HttpClient, ) {
    super("api/darazid/",http)
   }
}
