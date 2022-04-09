import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { DatatableComponent,ColumnMode,SelectionType } from'@swimlane/ngx-datatable'
import { UserdataService } from '../../services/userdata.service';
import {MatDialog} from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(DatatableComponent) table:DatatableComponent
  orders:any
  ColumnMode=ColumnMode;




  constructor(private user:UserdataService,private toastr:ToastrService,private dialog:MatDialog) {
   }

  ngAfterViewInit(): void {
    this.getAllUsers()
    
  }

  onSelect(event){
    console.log("Select",event)
  }

  onActivate(event){
    if(event.type=="click"){
      this.clickUser(event.row)
    }
  }

  clickUser(user){
    var dialogRef = this.dialog.open(AddUsersComponent,{
      data:user,width:"600px"
    })

    dialogRef.afterClosed().subscribe((res)=>{
      this.getAllUsers()
      // console.log(res)
      if(res!=undefined){this.toastr.success(res.dialogResult)}
    })
  }

  getAllUsers(){
    this.user.getAll().subscribe(res=>{
      this.orders=res
      
      
    })
  }

  addUserDialog(){
    console.log("Dialog opened")
    const dialogRef=this.dialog.open(AddUsersComponent)

    dialogRef.afterClosed().subscribe(()=>{
      this.getAllUsers()
    })
  }

  

  



}

