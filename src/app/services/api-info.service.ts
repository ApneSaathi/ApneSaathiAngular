import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import { VolunteerDetails} from '../volunteers/volunteers-list/volunteers-list.component';
@Injectable({
  providedIn: 'root'
})
export class ApiInfoService {

  constructor(private http: HttpClient) { }

  getSeniorCitizensList(): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getSrCitizenList";
    return this.http.get<any>(url);
  }


// opost.status="Active";
// opost.
  postVolunteersList(opost): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }
}
