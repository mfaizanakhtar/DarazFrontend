import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends DataService {

  constructor(http : HttpClient, ) {
    super("shop/",http)
   }
}
