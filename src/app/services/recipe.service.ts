import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeItem } from '../models/recipe-item.model';

const baseUrl="https://localhost:7176/api/Recipes";
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

//get, Post, getbyid, update, Delete
formData: Recipe[]=[];
recipeItemform?:RecipeItem[];
// details:childclass[];



constructor(private http:HttpClient) { }
saveOrUpdateMaster(){
  var body={
    ...this.formData,
    RecipeItems:this.recipeItemform
  }
  return this.http.post(baseUrl,body);
}


getAll(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(baseUrl);
}

get(id: any): Observable<Recipe> {
  return this.http.get<Recipe>(`${baseUrl}/${id}`);
}
create(data: any): Observable<any> {
  console.log(data)
  return this.http.post(baseUrl, data);
}

update(  data: any): Observable<any> {
  return this.http.put(`${baseUrl}`, data);
}
delete(id: any): Observable<any> {
  return this.http.delete(`${baseUrl}/${id}`);
}
deletebyItem(data: Recipe): Observable<any> {
  return this.http.delete(`${baseUrl}/{data}`);
}
deleteAll(): Observable<any> {
  return this.http.delete(baseUrl);
}
findByTitle(title: any): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${baseUrl}?title=${title}`);
}
}
