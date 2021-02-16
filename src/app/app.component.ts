import { UpdateordersService } from './updateorders.service';
import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private updateorders:UpdateordersService) {
    // this.refreshData();
   }


//    refreshData(){
//     interval(5000)
//     .subscribe((val)=>{


//       this.updateorders.postData()
//     })
//     }

//   title = 'darazapi';
}
