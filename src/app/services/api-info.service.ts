import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
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
  getVolunteerDetails(inputData): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteerDetails";
    return this.http.post<any>(url,inputData);
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




  // Active Volunteer List
  postVolunteersList(opost): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }


  // populateForm(element){
  //   const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";

  // }



  postVolunteersListStates(opost) {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
    
  }

  postVolunteersListDistricts(opost) {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }

  postVolunteersListBlocks(opost) {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }
  

  postVolunteersListPagination(opost): Observable<any> {
    const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
    return this.http.post<any>(url,opost);
  }


  // deboarded volunteerslist 
  getDeboardedVolunteersList(postObj): Observable<any> {
  const url = "http://15.207.42.209:8080/Volunteer/getVolunteersList";
  return this.http.post<any>(url,postObj);
}

  fileUpload(inputObject){
    let queryParams='';
      let postData={};
      if(inputObject.queryParams){
        queryParams="?"+inputObject.queryParams.join("&");
      }
      if(inputObject.postData){
        postData=inputObject.postData;
      }
      let api_Url=inputObject.url+queryParams;
      return this.http.post<any>(api_Url,postData,{
        reportProgress:true,
        observe: 'events',
      }).pipe(
        map(event => this.getEventMessage(event,postData))
      );
  }
  getEventMessage(event: HttpEvent<any>, formData) {
    switch(event.type){
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
          return { status: 'connecting', message: 'Connecting' };

    }
  }
  fileUploadProgress(event){
    const PercentDone= Math.round(100* event.loaded/event.total);
    return { status: 'progress', message: PercentDone };
  }
 apiResponse(event) {
    return event.body;
  }

}
