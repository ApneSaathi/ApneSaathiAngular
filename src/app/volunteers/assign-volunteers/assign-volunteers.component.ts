import { Component, OnInit, Input } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { FormBuilder, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';

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
  public base_url;
  public enable_assign_button:boolean=true;
  public loadingSpinner:boolean = true;
  public noData={message:''};
  public subs = new SubscriptionsContainer();
  constructor(
    private api_info: ApiInfoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GlobalDialogComponent>,
    private fb: FormBuilder
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
  }
  showNotification(notificationData){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:5000,
      panelClass: "notification-snackbar"
    });
  }
  ngOnDestroy(){
    this.subs.dispose();
  }
}
