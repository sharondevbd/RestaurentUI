import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyMenuService } from '../../../services/daily-menu.service';
import { RecipeService } from '../../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent {date=new Date().toLocaleDateString();
  constructor(
    private formBuilder:FormBuilder,
    private service:DailyMenuService,
    private RecipeService:RecipeService
  ){}

  menuForm:any=this.formBuilder.group({
    DailyMenuId:[0],
    DailyMenuDate:[new Date().toLocaleDateString(),Validators.required],
    //2024-07-20
    DemandQuantity:[0,[Validators.required]],
    CookedQuantity: [0],
    ServingQuantity: [0],
    Price: [0.00],
    RecipeId:[0,[Validators.required]]
  })
    
  change(){ 
  console.log(this.date)} 
  // date:string=new Date().toLocaleDateString()
}
