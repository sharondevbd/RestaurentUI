import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeItem } from '../../models/recipe-item.model';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items.service';
import { MatDialog,MatDialogConfig,MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { stringify } from 'node:querystring';



const groupBy = function(xs:any, key:any){
  return xs.reduce(function(rv:any,x:any){
    (rv[x[key]]=rv[x[key]] || []).push(x);
    return rv;
  },{});
};

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  
constructor(

  public service:RecipeService,
  private itemsrv:ItemsService,
  private dialog: MatDialog,
  private router: Router,
  private notify: ToastrService,
  private formBuilder: FormBuilder,


){}


ngOnInit(): void {
  this.gettableDataFromAPI();
  this.getitemlistfromapi();

}
IsformMode?:boolean=false;


formData:any = this.formBuilder.group({
  RecipeId: 0,
  RecipeName: ["", [Validators.required]]
})

// RecipeItems:service.;
// let re = this
reset(){
  this.formData= this.formBuilder.group({
    RecipeId: 0,
    RecipeName: ["", [Validators.required]]
  })
  this.recipeList=[];
  this.service.RecipeItems=[];
  this.ngOnInit();
}

addOrEditItems(itemIndex: any, id: any) {
  this.IsformMode=true;

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = false;
  // dialogConfig.width="30%";
  dialogConfig.data = { itemIndex, id }
  this.dialog.open(AddRecipeComponent, dialogConfig)
    .afterClosed().subscribe({
      next: () => {
        this.IsformMode=true;
        this.ngOnInit();
      }      
    })
  // let orderId = this.orderForm.value.orderId;
  //   .subscribe({
  //     next: (res) => this.updateGrandTotal(),
  //   });
}


itemList:any=[];
getitemlistfromapi() {
  this.itemsrv.getAll().subscribe({
    next: (data) => {
      this.itemList = data;
      // this.notify.info("Items Page Loaded !")
    }
  })
}
returnitemName(itemid:number):string{
   if(this.itemList!=null){
    for (let index = 0; index < this.itemList.length; index++) {
      if(this.itemList[index].ItemId==itemid){
        return this.itemList[index].Name
      }}}
      return "No Item Loaded"
}

recipeList:any=[];
  gettableDataFromAPI(){
    let data:any=[];
  
  this.service.getrecipeTable().subscribe({
    next:(res)=>{
      data=res;
      var new_data:any= groupBy(data,'RecipeName');
      Object.keys(new_data).forEach(key =>{
        this.recipeList.push({RecipeId:findrecipeId(new_data[key]),RecipeName:key, rawitems:new_data[key]})});
      }

  // Object.keys(new_data).forEach(key =>{
  // this.recipeList.push({RecipeName:key,rawitems:[new_data[key]]});
    // rawitems: new_data[key]  //to return two array like api

    //  let values = new_data[key];
    // values.forEach((element:any)=> {this.recipeList.push(element);});
    
})
}


save() {
  this.service.create(this.formData.value).subscribe({
    next:()=> {
      this.IsformMode=false;
      this.reset();
      // this.recipeList=[];
      // this.gettableDataFromAPI()
    }})
    // this.ngOnInit()
  // this.service.formData.push(this.formData.value)
  // this.service.saveOrUpdateMaster().subscribe({
  //   next:()=>console.log("Posted On APi")
  // });
}



removeItems(index: any,id?: any) {
  if(id==null){
  this.service.RecipeItems.splice(index, 1)}
  else{
    this.service.delete(id).subscribe({
      next: (res) => {
        debugger
        console.log(`Sucessfully Deleted database:${id} Index no: ${index}`);
        // this.notify.error(`Sucessfully Deleted database:${ItemId} Index no: ${index}`)
      }
    })

    this.recipeList.splice(index, 1);
  }}

formMode(){
  this.IsformMode=true;
}
closeFormMode(){
  this.IsformMode=false;
  this.reset()
}
}

function findrecipeId(new_data: any):number {
  let data = new_data
  for (let index = 0; index < data.length; index++) {
    if (index==0){
    const element:number = data[index].RecipeId;
    return element
    }
  }
  return 0
}

