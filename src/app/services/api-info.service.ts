import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInfoService {

  constructor(private http: HttpClient) { }

  getAssignedSeniorCitizensList(): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getSrCitizenList";
    return this.http.post<any>(url,{"status":"Assigned"});
  }
  getUnassignedSeniorCitizensList(): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getSrCitizenList";
    return this.http.post<any>(url,{"status":"Unassigned"});
  }
  getDeboardedSeniorCitizensList(): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getSrCitizenList";
    return this.http.post<any>(url,{"status":"Deboarded"});
  }
}
