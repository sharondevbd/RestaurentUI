import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Items } from '../../models/items.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemsService } from '../../services/items.service';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [FormsModule,MatAutocompleteModule, MatFormFieldModule],
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
    formData:Items;
  }
}
