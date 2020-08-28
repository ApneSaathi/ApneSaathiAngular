import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import { VolunteerDetails} from '../volunteers/volunteers-list/volunteers-list.component';
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
// opost.status="Active";
// opost.
  postVolunteersList(opost): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }

  postVolunteersListPagination(opost): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }


  // deboarded volunteerslist 
postDeboardedVolunteersList(opost): Observable<any> {
  const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
  return this.http.post<any>(url,opost);
}

}
