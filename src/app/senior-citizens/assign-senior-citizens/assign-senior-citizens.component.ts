import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormArray } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';

@Component({
  selector: 'app-assign-senior-citizens',
  templateUrl: './assign-senior-citizens.component.html',
  styleUrls: ['./assign-senior-citizens.component.scss']
})
export class AssignSeniorCitizensComponent implements OnInit, OnDestroy {

  @Input() volunteerObj;
  assignCitizenForm=this.fb.group({
    selectAll:[false],
    selectedCitizens: this.fb.array([])
  });
  public srCitizensList:object[];
  public base_url;
  public enable_assign_button:boolean=true;
  public loadingSpinner:boolean = true;
  public subs= new SubscriptionsContainer();
  constructor(
    private fb: FormBuilder,
    private api_info: ApiInfoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GlobalDialogComponent>) { }
  get selectedCitizens(){
    return this.assignCitizenForm.get('selectedCitizens') as FormArray;
  }
  addSelectedCitizens(){
    this.srCitizensList.forEach(element => {
      //console.log(element);
      this.selectedCitizens.push(
        this.fb.group({
          id: [element['srCitizenId']],
          checked:[false]
        })
        );
    });  
  }
  ngOnInit(): void {
    // parameter defining for API Call 
    this.base_url=environment.base_url;
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/getSrCitizenList",
      postData:{
        status:"UnAssigned",
        filterState: this.volunteerObj.state,
        filterDistrict: this.volunteerObj.district
      }
    };
    // dynamicPostRequest funcion invoke to get the sr CItizen list from API
    this.subs.add=this.api_info.dynamicPostRequest(paramsObj).subscribe(data=>{
      console.log(data);
      this.srCitizensList=data.srCitizenList;
      this.addSelectedCitizens();
      this.loadingSpinner=false;
    });
    this.subs.add=this.assignCitizenForm.get('selectedCitizens').valueChanges
    .subscribe(value=> {
      console.log(value.findIndex(citizen => citizen.checked==true))
      if(value.findIndex(citizen => citizen.checked==true) != -1){
        this.enable_assign_button=false;
      }
      else{
        this.enable_assign_button=true;
      }
    })
    // this.srCitizensList=[
    //   {id:1,name:"Citizen1",phone:1234567890},
    //   {id:2,name:"Citizen2",phone:1234567890},
    //   {id:3,name:"Citizen3",phone:1234567890},
    //   {id:4,name:"Citizen4",phone:1234567890},
    //   {id:5,name:"Citizen5",phone:1234567890},
    //   {id:6,name:"Citizen6",phone:1234567890},
    //   {id:7,name:"Citizen7",phone:1234567890},
    //   {id:8,name:"Citizen8",phone:1234567890},
    //   {id:9,name:"Citizen9",phone:1234567890},
    //   {id:10,name:"Citizen10",phone:1234567890},
    //   {id:11,name:"Citizen11",phone:1234567890},
    //   {id:12,name:"Citizen12",phone:1234567890},
    //   {id:13,name:"Citizen13",phone:1234567890},
    //   {id:14,name:"Citizen14",phone:1234567890},
    //   {id:15,name:"Citizen15",phone:1234567890},
    // ];
    // this.assignCitizenForm.valueChanges.subscribe(formArray=>{
    //   console.log(formArray);
    // });
    
    //console.log(this.assignCitizenForm.value);
  }
  /**
   * onchecked function is to handle individual check/uncheck of sr Citizen
   * @param event 
   */
  onchecked(event){
    //this.assignCitizenForm.controls['selectAll']
    if(!event.checked && this.assignCitizenForm.controls['selectAll'].value){
      this.assignCitizenForm.controls['selectAll'].patchValue(false);
    }
    else{
      //console.log(this.assignCitizenForm.value.selectedCitizens);
      if(this.assignCitizenForm.value.selectedCitizens.findIndex(citizen=>{ 
        //console.log("ID:"+citizen.id+", Checked:"+citizen.checked);
        return citizen.checked===false
       })==-1){
        this.assignCitizenForm.controls['selectAll'].patchValue(true);
       }
       
      // if(this.assignCitizenForm.value.selectedCitizens.findIndex(citizen=>{ citizen.checked===false })==-1){
      //   this.setAllCheckboxValues(true);
      //   this.assignCitizenForm.controls['selectAll'].patchValue(true);
      // }
    }
    //console.log(this.assignCitizenForm.value);
  }
  /**
   * onChangeSelectAll function is to trigger check/uncheck the sr Citizens list
   */
  onChangeSelectAll(){
    let temp_checked=false;
    if(this.assignCitizenForm.controls['selectAll'].value){
      temp_checked=true;
    }
    //console.log(this.assignCitizenForm.value)
    this.setAllCheckboxValues(temp_checked);
    //console.log(this.assignCitizenForm.value);
  }
  /**
   * setAllCheckboxValues function is to check/uncheck all sr citizens list
   * @param check_value 
   */
  setAllCheckboxValues(check_value){
    this.assignCitizenForm.value.selectedCitizens.forEach((element , i) => {
      this.selectedCitizens.controls[i].patchValue({
        checked:check_value
      })
    });
  }/**
   * assignCitizens function is to assign sr Citizens to the volunteer
   */
  assignCitizens(){
    this.loadingSpinner=true;
    let finalListIds= this.assignCitizenForm.value.selectedCitizens
    .filter(citizen => citizen.checked===true )
    .map(element=>{
      return this.srCitizensList.find(citizen=> {
        if(citizen['srCitizenId'] == element.id) 
        return citizen; 
      });
    });
    let assignParamsObj={
      url:"http://15.207.42.209:8080/Volunteer/assignSrCitizen",
      postData:{
        idvolunteer:this.volunteerObj.idvolunteer,
        //idvolunteer:this.volunteerObj.contactNumber,
        role:"1",
        adminId:"2",
        srCitizenList:finalListIds
      }
    };
    // dynamicPostRequest funcion invoke to get the sr CItizen list from API
    this.subs.add=this.api_info.dynamicPostRequest(assignParamsObj).subscribe(data=>{
      this.loadingSpinner=false;
      console.log("Assign Response",data);
      let message= this.volunteerObj.firstName+" was Succesfully assigned with "+finalListIds.length+" Sr.Citizens";
      if(data && data.message=='Success'){
        //message="Something went wrong";
        this.dialogRef.close();
      }
      else{
        //this.dialogRef.close();
        message="Something went wrong";
      }
      this.showNotification({message: message,success:true});
    },
    // error=>{
    //   this.loadingSpinner=false;
    //   console.log("Error Response",error);
    //   let error_msg="Something went wrong";
    //   console.log(error_msg);
    //   this.showNotification({message: error_msg});
    // }
    )
    //console.log(assignParamsObj);
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
