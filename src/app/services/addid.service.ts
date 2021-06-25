import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddidService extends DataService {

  constructor(http : HttpClient, ) {
    super("http://localhost:3000/api/darazid/",http)
   }
}
