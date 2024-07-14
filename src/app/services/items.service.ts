import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  getAutocompleteData() {
    throw new Error('Method not implemented.');
  }
  postNewData(selectedOption: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
}
