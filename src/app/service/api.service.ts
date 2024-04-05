import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: string = "localhost/angular-lc/api"
  constructor(private http:HttpClient) { }
  login(body:any){
    return this.http.post(this.api+"/login",body)
  }
}
