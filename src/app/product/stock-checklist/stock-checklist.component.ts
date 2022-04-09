import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../services/label.service';

@Component({
  selector: 'app-stock-checklist',
  templateUrl: './stock-checklist.component.html',
  styleUrls: ['./stock-checklist.component.scss']
})
export class StockChecklistComponent implements OnInit {
  StockChecklist
  permissions;
  constructor(private label:LabelService,private auth:AuthService) { }

  ngOnInit(): void {
    this.StockChecklist =this.label.getStockChecklist()
    this.permissions = this.auth.getPermissions();
    console.log(this.StockChecklist)
  }

}
