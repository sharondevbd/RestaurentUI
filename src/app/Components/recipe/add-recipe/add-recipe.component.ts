import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { RecipeItem } from '../../../models/recipe-item.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatDialogClose,ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  constructor(
    private itemservice:ItemsService,
    public recipeService:RecipeService,
    private formBuilder:FormBuilder
  ){}

  dialogRef=inject(MatDialogRef);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getitemlistfromapi();

  }




recipeItemsForm:any=this.formBuilder.group({
  RecipeItemId: [0],
  Quantity: [0],
  Unit:['',Validators.required],
  RecipeId:0,
  ItemId: [0]
});


itemList:any=[];
getitemlistfromapi() {
  this.itemservice.getAll().subscribe({
    next: (data) => {
      this.itemList = data;
      // this.notify.info("Items Page Loaded !")
    }})};


save() {
  
  this.recipeService.RecipeItems.push(this.recipeItemsForm.value)
  this.dialogRef.close();
  debugger
  console.log(this.recipeItemsForm.value)
}

}
