import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyMenu } from '../models/daily-menu.model';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
const baseUrl="https://localhost:7176/api/DailyMenu";
@Injectable({
  providedIn: 'root'
})
export class DailyMenuService {

  constructor(private http:HttpClient) { }
  RecipeItems=[];
  
getAll(): Observable<DailyMenu[]> {
  return this.http.get<DailyMenu[]>(baseUrl);
}
getrecipeTable():Observable<any>{
  return this.http.get(`${baseUrl}/getrecipeTable`)
}
get(id: any): Observable<DailyMenu> {
  return this.http.get<DailyMenu>(`${baseUrl}/${id}`);
}
create(data: DailyMenu): Observable<any> {
  const obj ={
    ...data,
    RecipeItems:this.RecipeItems
  }
  return this.http.post(baseUrl, obj);
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
