import { Component, OnInit } from '@angular/core';
import { DailyMenu } from '../../../models/daily-menu.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyMenuService } from '../../../services/daily-menu.service';
import { CommonModule } from '@angular/common';
import { ConnectableObservable } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    public service:DailyMenuService,

  ){}
  ngOnInit(): void {
    this.Reset();


  }
  recipeNames:any=[{
    RecipeId:1,
    RecipeName:"Pasta"
  }]
  DailyMenuForm:any=[];
  formData:any=this.formBuilder.group({
    DailyMenuId:[0],
    DailyMenuDate:new Date().toLocaleDateString(),  //2024-07-20
    DemandQuantity:[0, Validators.required],
    CookedQuantity:[0],
    ServingQuantity: [0],
    Price:[0.00, Validators.pattern],
    RecipeId:[0, Validators.required],
  })

  Reset():void {
    if(this.DailyMenuForm==null || []){
      // this.DailyMenuForm.push(this.formData.value)
      this.formData.reset();
    }
      console.log(this.DailyMenuForm)
  };

  addOrEditItems(index: any,id: any) {
     
         this.DailyMenuForm.unshift(this.formData.value);
        // debugger
        console.log(this.DailyMenuForm);
        this.formData.reset()
      
      //Edit Part
    };

  closeFormMode() {
  }
 
  removeItems(index: any,id?: any) {
    if(id==null){
    this.DailyMenuForm.splice(index, 1)}
    else{
      this.service.delete(id).subscribe({
        next: (res) => {
          debugger
          console.log(`Sucessfully Deleted database:${id} Index no: ${index}`);
          // this.notify.error(`Sucessfully Deleted database:${ItemId} Index no: ${index}`)
        }
      })
  
      // this.recipeList.splice(index, 1);
    }}
  returnitemName(arg0: any) {
  
  }
  
  save() {
  
  }
}
