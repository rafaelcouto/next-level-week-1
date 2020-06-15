import { Item } from './../../models/Item';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = environment.API + 'items';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Item[]>(this.baseUrl).toPromise();
  }

}
