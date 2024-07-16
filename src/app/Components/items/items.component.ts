import { Component, OnInit } from '@angular/core';
import { Items } from '../../models/items.model';
import { ItemsService } from '../../services/items.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddItemsComponent } from '../add-items/add-items.component';
import { DialogConfig } from '@angular/cdk/dialog';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
  
})
export class ItemsComponent implements OnInit {

  constructor(private service:ItemsService, 
    private dialog:MatDialog,
  ){  }

  item:Items[]=[];
  itemList:any=[
    {"ItemId":0, "Name":"No Item Found From API"},
  ];
  ngOnInit(): void {
    this.getitemlistfromapi();
  }

  getitemlistfromapi(){
    this.service.getAll().subscribe({
      next:(data)=>{
          this.itemList=data;
        }})}

  // itemList:any=[];
  addOrEditItems(itemIndex: any, id:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width="50%";
    dialogConfig.data = {itemIndex, id}
    this.dialog.open(AddItemsComponent, dialogConfig)
    .afterClosed()
    // let orderId = this.orderForm.value.orderId;
    //   .subscribe({
    //     next: (res) => this.updateGrandTotal(),
    //   });
  }
  removeItems(id: any) {
    console.log(id);
    this.itemList.splice(id, 1);
  }
}
