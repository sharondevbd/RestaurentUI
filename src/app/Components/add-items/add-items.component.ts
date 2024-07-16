import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Items } from '../../models/items.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemsService } from '../../services/items.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,RouterLink
  ],



  //MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddItemsComponent>,
    private formBuilder: FormBuilder,
    private service: ItemsService,
  ){}

  

  ngOnInit(): void {
    if(this.data.id>0){
      this.patchEditdata()
    }
    
  }

  itemform = this.formBuilder.group({
    Name:["",[Validators.required]]
  })

  save(){
    console.log(this.data.id+"no Item")
    if(this.data.id==null){
      const item:Items={
        ItemId: 0,
        Name: this.itemform.value.Name!
      };
      this.service.create(item).subscribe({
        next:()=> console.log("Item Created Sucessfully")}); 
    } else{
      const item:Items={
        ItemId: this.data.id,
        Name: this.itemform.value.Name!
      };
      this.service.update(item).subscribe({
        next:()=> console.log("Item Updated Sucessfully")});
    }
  }

  
  patchEditdata(){
    this.service.get(this.data.id).subscribe({
      next:(res)=> {this.itemform.patchValue(res);
        console.log(res)
      }
    })
  }

  update(){

  }

  //multiple Insert
  // saveOrUpdateMaster(){
  //   var body={
  //     ...this.formdata,
  //     navigateofparrent:this.details
  //   }
  //   return this.http.post(baseUrl,body);
  // }


}
