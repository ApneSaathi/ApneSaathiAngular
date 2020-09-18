import { Component, OnInit, Input } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { FormBuilder, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-assign-volunteers',
  templateUrl: './assign-volunteers.component.html',
  styleUrls: ['./assign-volunteers.component.scss']
})
export class AssignVolunteersComponent implements OnInit {

  @Input() volunteerObj;
  assignVolunteerForm=this.fb.group({
    selectAll:[false],
    selectedVolunteers: this.fb.array([])
  });
  public volunteersList:object[];
  public srCitizensList:object[];
  public base_url;
  public enable_assign_button:boolean=true;
  public loadingSpinner:boolean = true;
  public noData={message:''};
  public subs = new SubscriptionsContainer();
  constructor(
    private api_info: ApiInfoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GlobalDialogComponent>,
    private fb: FormBuilder,
    private shared_service: SharedService
    ) 
  { 

  }
  get selectedVolunteers(){
    return this.assignVolunteerForm.get('selectedVolunteers') as FormArray;
  }
  volunteerRatingClass(volunteer){
    return {
      'rating-icon-red': volunteer.rating > 0 && volunteer.rating <= 3,
      'rating-icon-yellow': volunteer.rating > 0  && volunteer.rating > 3
    }
  }
  ngOnInit(): void {
    this.base_url= environment.base_url;
    this.getVolunteersForAssignment();
    this.getSrCitizensList();
    this.subs.add=this.assignVolunteerForm.get('selectedVolunteers').valueChanges
    .subscribe(value=> {
      console.log(value.findIndex(volunteer => volunteer.checked==true))
      if(value.findIndex(volunteer => volunteer.checked==true) != -1){
        this.enable_assign_button=false;
      }
      else{
        this.enable_assign_button=true;
      }
    });
  }
  addSelectedVolunteers(){
    this.volunteersList.forEach(element => {
      //console.log(element);
      this.selectedVolunteers.push(
        this.fb.group({
          id: [element['idvolunteer']],
          checked:[false]
        })
        );
    });  
  }
  getVolunteersForAssignment(){
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/getVolunteersList",
      postData:{
        status:"Active",
        filterState: this.volunteerObj.state,
        filterDistrict: this.volunteerObj.district,
        excludeIds:[this.volunteerObj.idvolunteer]
      }
    };
    this.loadingSpinner=true;
    this.subs.add = this.api_info.dynamicPostRequest(paramsObj).subscribe(response=>{
      if(response.message=='Success' && response.statusCode ==0 ){
        this.volunteersList= response.volunteers;
        this.addSelectedVolunteers();
        this.noData.message="";
      }
    },
    errorResponse=>{
      if(errorResponse.status == 409){
        this.noData.message="No Records Found";
      }
      this.volunteersList=[];
    },
    ()=>{
      this.loadingSpinner=false;
    });
  }
  /**
   * getSrCitizensList function is to fetch the list of assigned srCitizens to the Volunteer
   * 
   */
  getSrCitizensList(){
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/srCitizenByVolunteer",
      postData:{id: this.volunteerObj.idvolunteer}
    };
    this.subs.add = this.api_info.dynamicPostRequest(paramsObj).subscribe(response=>{
      console.log(response);
      if(response.message=='Success' && response.statusCode ==0 && typeof response.srCitizenList!='undefined' &&  response.srCitizenList.length > 0 ){
        this.srCitizensList= response.srCitizenList;
        console.log("Assigned Citizens:",this.srCitizensList);
        this.noData.message="";
      }
      else{
        this.noData.message="";
      }
    },
    errorResponse=>{
      if(errorResponse.status == 409){
        this.noData.message="";
      }
      else{
        this.noData.message="Something went wrong.!";
      }
      this.srCitizensList=[];
    });
  }
  /**
   * onchecked function is to handle individual check/uncheck of Volunteer
   * @param event 
   */
  onchecked(event){
    if(!event.checked && this.assignVolunteerForm.controls['selectAll'].value){
      this.assignVolunteerForm.controls['selectAll'].patchValue(false);
    }
    else{
      if(this.assignVolunteerForm.value.selectedVolunteers.findIndex(citizen=>{ 
        return citizen.checked===false
       })==-1){
        this.assignVolunteerForm.controls['selectAll'].patchValue(true);
       }
       
    }
  }
  /**
   * onChangeSelectAll function is to trigger check/uncheck the volunteers list
   */
  onChangeSelectAll(){
    let temp_checked=false;
    if(this.assignVolunteerForm.controls['selectAll'].value){
      temp_checked=true;
    }
    this.setAllCheckboxValues(temp_checked);
  }
  /**
   * setAllCheckboxValues function is to check/uncheck all Volunteers list
   * @param check_value 
   */
  setAllCheckboxValues(check_value){
    this.assignVolunteerForm.value.selectedVolunteers.forEach((element , i) => {
      this.selectedVolunteers.controls[i].patchValue({
        checked:check_value
      })
    });
  }
  shareCitizens(){
    console.log(this.assignVolunteerForm.value)
    this.loadingSpinner=true;
    let finalListIds= this.assignVolunteerForm.value.selectedVolunteers
    .filter(volunteer => volunteer.checked===true )
    .map(element=>{
      return this.volunteersList.find(volunteer=> {
        if(volunteer['idvolunteer'] == element.id) 
        return volunteer; 
      });
    });
    let assignParamsObj={
      url:"http://15.207.42.209:8080/Volunteer/distributeSrCitizen",
      postData:{
        idvolunteer:this.volunteerObj.idvolunteer,
        //idvolunteer:this.volunteerObj.contactNumber,
        role:this.shared_service.loginUser.adminId,
        adminId:this.shared_service.loginUser.role,
        srCitizenList:this.srCitizensList,
        volunteerList:finalListIds,
      }
    };
    // dynamicPostRequest funcion invoke to get the sr CItizen list from API
    console.log("Post Data:",assignParamsObj);
    let message= '';
    this.subs.add=this.api_info.dynamicPostRequest(assignParamsObj).subscribe(data=>{
      let success=false;
      console.log("Assign Response",data);
      //let message= this.volunteerObj.count_SrCitizen+ this.volunteerObj.count_SrCitizen > 1?' volunteers':' volunteer'+" of "+this.volunteerObj.firstName+" has been transferred to others and deboarded "+ this.volunteerObj.gender=='M'?'him':'her' +"successfully.";
      if(data && data.message=='Success'){
        //message="Something went wrong";
        this.dialogRef.close({transfer:true});
        success=true;
      }
      else{
        //this.dialogRef.close();
        message="Something went wrong";
        this.showNotification({message: message,success});
      }
    },
    errorResponse=>{
      message="Something went wrong";
      this.showNotification({message: message,success:false});
    },
    ()=>{
      this.loadingSpinner=false;
    })
  }
  showNotification(notificationData,duration=5000){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:duration,
      panelClass: "notification-snackbar"
    });
  }
  ngOnDestroy(){
    this.subs.dispose();
  }
}
