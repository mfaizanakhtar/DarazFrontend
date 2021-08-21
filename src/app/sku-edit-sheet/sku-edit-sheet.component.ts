import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sku-edit-sheet',
  templateUrl: './sku-edit-sheet.component.html',
  styleUrls: ['./sku-edit-sheet.component.css']
})
export class SkuEditSheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data:any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
