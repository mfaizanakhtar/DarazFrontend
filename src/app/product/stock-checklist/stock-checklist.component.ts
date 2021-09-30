import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../services/label.service';

@Component({
  selector: 'app-stock-checklist',
  templateUrl: './stock-checklist.component.html',
  styleUrls: ['./stock-checklist.component.scss']
})
export class StockChecklistComponent implements OnInit {
  StockChecklist
  constructor(private label:LabelService) { }

  ngOnInit(): void {
    this.StockChecklist =this.label.getStockChecklist()
    console.log(this.StockChecklist)
  }

}
