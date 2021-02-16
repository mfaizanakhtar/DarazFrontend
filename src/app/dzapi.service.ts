import { HttpClient } from '@angular/common/http';
import jsSHA from 'jssha'
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DzapiService {

  // url="https://api.sellercenter.daraz.pk?";
  // Format='json';
  // createdAfter=encodeURIComponent(new Date('02-25-2014').toISOString().substr(0,19)+'+00:00');
  // userID
  // Timestamp=encodeURIComponent(new Date().toISOString().substr(0,19)+'+00:00');

  constructor(private http:HttpClient) {

    
   }

  //  getOrders(userid,secretkey,Offset){
  //    this.userID=encodeURIComponent(userid);

  //    let Action='GetOrders';

  //    let apiparams='Action='+Action+'&CreatedAfter='+this.createdAfter+'&Format='+this.Format+'&Offset='+Offset+'&SortBy=created_at'+'&SortDirection=DESC'+'&Timestamp='+this.Timestamp+'&UserID='+this.userID+'&Version=1.0'
      
  //    let apiurl=this.url+apiparams+'&Signature='+this.SignParameters(secretkey,apiparams);

  //    apiurl;
  //    console.log(apiurl);

  //   return this.http.post('http://localhost:3000/api/darazapi',{url:apiurl}).pipe(
  //     map(response=>response)
  //   )
     
  //  }

  //  SignParameters(secretkey,param){
  //    const hash = new jsSHA("SHA-256","TEXT",{ hmacKey :{ value: secretkey, format: "TEXT"}});
  //    hash.update(param)
  //    return hash.getHash("HEX");
  //  }
}
