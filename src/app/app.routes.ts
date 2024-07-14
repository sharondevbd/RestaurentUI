import { Routes } from '@angular/router';
import { LoginComponent } from './LoginPage/login/login.component';
import { ItemsComponent } from './Components/items/items.component';


export const routes: Routes = [
    {path:"loging", component:LoginComponent},
    {path:"signup", component:LoginComponent},
    {path:"", component:ItemsComponent},

];
