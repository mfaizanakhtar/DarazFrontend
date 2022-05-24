import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-screenshot',
  templateUrl: './view-screenshot.component.html',
  styleUrls: ['./view-screenshot.component.scss']
})
export class ViewScreenshotComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }
  screenShot:any
  ngOnInit(): void {
    this.screenShot=this.data.screenShot;
    console.log(this.data.screenShot)
  }

}
