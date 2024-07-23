import { Component, inject, OnInit } from '@angular/core';
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
import { Items } from '../../../models/items.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemsService } from '../../../services/items.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouteConfigLoadStart, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    MatIconModule, RouterLink
  ],



  //MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {

  constructor(

    private formBuilder: FormBuilder,
    private service: ItemsService,
    private router: Router,
    private notify: ToastrService
  ) { }

  dialogRef = inject(MatDialogRef<AddItemsComponent>)
  data = inject(MAT_DIALOG_DATA)

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.patchEditdata()
    }

  }

  itemform = this.formBuilder.group({
    Name: ["", [Validators.required]]
  })

  save() {
    console.log(this.data.id + "no Item")
    if (this.data.id == null) {
      const item: Items = {
        ItemId: 0,
        Name: this.itemform.value.Name!
      };
      this.service.create(item).subscribe({
        next: () => {
          this.notify.success("Item Created Sucessfully");
          this.dialogRef.close();
          // this.router.navigateByUrl("/items")
        }
      });
    } else {
      const item: Items = {
        ItemId: this.data.id,
        Name: this.itemform.value.Name!
      };
      this.service.update(item).subscribe({
        next: () => {
          this.notify.warning("Item Updated Sucessfully");
          this.dialogRef.close();
        }
      });
    }
  }


  patchEditdata() {
    this.service.get(this.data.id).subscribe({
      next: (res) => {
        this.itemform.patchValue(res);
        console.log(res)
      }
    })
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
