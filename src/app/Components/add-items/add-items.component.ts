import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
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
  imports: [FormsModule,MatAutocompleteModule, MatFormFieldModule,MatInputModule,
    MatIconModule, MatButtonModule,ReactiveFormsModule,RouterLink, MatDialogClose
  ],

  //MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef:MatDialogRef<AddItemsComponent>,
    private formBuilder: FormBuilder,
    private service: ItemsService,
  ){}


  value = 'Clear me';
  ngOnInit(): void {
    formData:Items;
  }

  itemform = this.formBuilder.group({
    Name:["",[Validators.required]]
  })

  save(){
    console.log(this.itemform.value);
    const item:Items={
      ItemId: 0,
      Name: this.itemform.value.Name!
    };
    this.service.create(item).subscribe({
      next:()=> console.log("Item Created Sucessfully")});
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
