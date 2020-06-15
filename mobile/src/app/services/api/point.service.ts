import { Point } from './../../models/Point';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private baseUrl = environment.API + 'points';

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Point>(`${this.baseUrl}/${id}`).toPromise();
  }

  create(point: Point) {
    return this.http.post(this.baseUrl, point).toPromise();
  }

  getAll() {
    return this.http.get<Point[]>(this.baseUrl).toPromise();
  }
}
