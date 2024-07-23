import { RecipeItem } from "./recipe-item.model";

export class Recipe {

    RecipeId: number=0;
    RecipeName:string= "";
    // DailyMenus: []=[];
    // RecipeItems:RecipeItem[]=[];
}

// {
//     "RecipeId": 1,
//     "RecipeName": "Burger",
//     "DailyMenus": [],
//     "RecipeItems": [
//       {
//         "RecipeItemId": 1,
//         "Quantity": 100,
//         "Unit": "gm",
//         "RecipeId": 1,
//         "ItemId": 1
//       }
//     ]
//   }