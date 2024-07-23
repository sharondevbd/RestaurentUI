import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyMenuService } from '../../services/daily-menu.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-daily-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './daily-menu.component.html',
  styleUrl: './daily-menu.component.css'
})
export class DailyMenuComponent {
removeItems(_t24: number,arg1: any) {
throw new Error('Method not implemented.');
}
addOrEditItems(arg0: any,arg1: null) {
throw new Error('Method not implemented.');
}

  // date=new Date().toLocaleDateString();
  constructor(
    private formBuilder:FormBuilder,
    private service:DailyMenuService,
    private RecipeService:RecipeService
  ){}

  dailyMenu:any=[
    {
      DailyMenuId: 2,
      DailyMenuDate: "2024-07-20",
      DemandQuantity: 10,
      CookedQuantity: null,
      ServingQuantity: null,
      Price: 100,
      RecipeId: 1,
      Recipe: {
        RecipeId: 1,
        RecipeName: "Pasta",
        DailyMenus: [
          null
        ],
        "RecipeItems": []
      },
      "SaleDetails": []
    }
  ];



}