import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends DataService {

  constructor(http:HttpClient) {
    super('lookups',http);
  }

  getLookupDetail(key){
    return this.get('/getLookup/'+key).pipe(
      map((res:any)=>res.lookup_detail)
    )
  }
}
