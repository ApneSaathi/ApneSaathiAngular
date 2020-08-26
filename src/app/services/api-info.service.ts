import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInfoService {

  constructor(private http: HttpClient) { }

  getSeniorCitizensList(): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getSrCitizenList";
    return this.http.get<any>(url);
  }
  dynamicGetRequest(inputObject): Observable<any>{
    let queryParams='';
    if(inputObject.queryParams){
      queryParams="?"+inputObject.queryParams.join("&");
    }
    let api_Url=inputObject.url+queryParams;
    return this.http.get<any>(api_Url);
  }
  dynamicPostRequest(inputObject): Observable<any>{
    let queryParams='';
    let postData={};
    if(inputObject.queryParams){
      queryParams="?"+inputObject.queryParams.join("&");
    }
    if(inputObject.postData){
      postData=inputObject.postData;
    }
    let api_Url=inputObject.url+queryParams;
    return this.http.post<any>(api_Url,postData);
  }
}
