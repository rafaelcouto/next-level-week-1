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

  create(point: Point) {
    return this.http.post(this.baseUrl, point).toPromise();
  }
}
