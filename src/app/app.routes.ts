import { Routes } from '@angular/router';
import { LoginComponent } from './LoginPage/login/login.component';
import { ItemsComponent } from './Components/items/items.component';
import { AddItemsComponent } from './Components/items/add-items/add-items.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { DailyMenuComponent } from './Components/daily-menu/daily-menu.component';


export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"signup", component:LoginComponent},
    {path:"items", component:ItemsComponent},
    {path:"recipe", component:RecipeComponent},
    {path:"", component:DailyMenuComponent},
    {path:"dailymenu", component:DailyMenuComponent}
    
    

];
