import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../models/items.model';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';
const baseUrl="https://localhost:7176/api/Items";
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  //get, Post, getbyid, update, Delete
  formdata: Items | undefined;
  // details:childclass[];



  constructor(private http:HttpClient) { }
  // saveOrUpdateMaster(){
  //   var body={
  //     ...this.formdata,
  //     navigateofparrent:this.details
  //   }
  //   return this.http.post(baseUrl,body);
  // }


  getAll(): Observable<Items[]> {
    return this.http.get<Items[]>(baseUrl);
  }

  get(id: any): Observable<Items> {
    return this.http.get<Items>(`${baseUrl}/${id}`);
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
  deletebyItem(data: Items): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Items[]> {
    return this.http.get<Items[]>(`${baseUrl}?title=${title}`);
  }
}
