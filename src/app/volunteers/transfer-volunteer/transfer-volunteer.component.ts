import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { LocationService } from 'src/app/services/location.service';
import { environment } from 'src/environments/environment';
import { VolunteerDetailViewComponent } from '../volunteer-detail-view/volunteer-detail-view.component';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';

@Component({
  selector: 'app-transfer-volunteer',
  templateUrl: './transfer-volunteer.component.html',
  styleUrls: ['./transfer-volunteer.component.scss']
})
export class TransferVolunteerComponent implements OnInit {

  @Input() volunteerObj;
  transferVolunteerForm=this.fb.group({
    
  });

public dataSource;
public base_url;
public subs= new SubscriptionsContainer();
public selectedState:any;
public selectedDistrict:any;
public selectedBlock:any;
public transferVolunteerDetails:boolean=false;
selectedId: number;
firstName:any;
pic:any;
currentState:any;
currentDistrict:any;
currentBlock:any;
states: {};
districts: {};
blocks:{};
statesList: any;
districtsList: string[];
blocksList: any;
currentVolunteer:VolunteerDetailViewComponent
volunteerDetailsDataSource:any;
filterState:any;
filterDistrict:any;
filterBlock:any;
message:string='';
putData:any;

  constructor(private fb: FormBuilder,private route:ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GlobalDialogComponent>,private locationService:LocationService,private apiInfoService:ApiInfoService,public dialog:MatDialog) { }


    
  ngOnInit(): void {

    // parameter defining for API Call 
    this.base_url=environment.base_url;
    this.selectedId=this.volunteerObj.idvolunteer;
    this.transferVolunteer();
    this.selectedState="State";
    this.selectedDistrict="District";
    this.selectedBlock="Block";
    this.getStates();
    console.log(this.selectedId);
  }
  transferVolunteer(){
    console.log(this.volunteerObj);

    
    this.firstName=this.volunteerObj.firstName;
    this.pic=this.volunteerObj.pic;
    this.currentState=this.volunteerObj.state;
    this.currentDistrict=this.volunteerObj.district;
    this.currentBlock=this.volunteerObj.block;
    console.log(this.volunteerDetailsDataSource); 
    console.log(this.volunteerObj);

    }

  getStates(){
    this.statesList=this.locationService.getStates();
    console.log(this.statesList);
    
  }
  getDistricts(){
    this.districtsList=this.locationService.getDistricts(this.selectedState);
    console.log(this.districtsList);
  }

getBlocks(){
  this.blocksList=this.locationService.getBlocks(this.selectedState,this.selectedDistrict);
    console.log(this.blocksList);
}

onChangeState(selectedState) {
  if(selectedState=="State"){
    selectedState=null;
    let postData={status:"Active"}
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    this.states=data.volunteers.states;
    this.blocksList=null;
      this.districtsList=null;
  });
  }
if (selectedState) {
    this.getDistricts();
    }
    }


onChangeDistrict(selectedDistrict) {
  if(selectedDistrict=="District"){
    this.getDistricts();
    selectedDistrict=null;
    let postData={status:"Active",filterState:this.selectedState}
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    // this.blocksList=null;
    this.blocksList=null;
  });
 
}

  if (selectedDistrict) {
    this.getBlocks();
 
  }
}


onChangeBlock(selectedBlock) {
  if(selectedBlock=="Block"){
    this.getBlocks();
    selectedBlock=null;
    let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict}
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    
      this.blocksList=null;
  });
 
}
  if (selectedBlock) {
   
  }
}

volunteerTransferred(){
  if(this.transferVolunteerDetails==true){
    
    if(this.selectedState && this.selectedDistrict && this.selectedBlock){
      this.putData={idvolunteer:this.selectedId,state:this.selectedState,district:this.selectedDistrict,block:this.selectedBlock}
     
    }
    else if(this.selectedState && this.selectedDistrict && this.selectedBlock=="Block"){
      this.selectedBlock=null;
    this.putData={idVolunteer:this.selectedId,state:this.selectedState,district:this.selectedDistrict,block:this.selectedBlock}
    
    }
    else if(this.selectedState && this.selectedDistrict=="District" && this.selectedBlock=="Block"){
      this.selectedDistrict=null;
      this.selectedBlock=null;
      this.putData={idVolunteer:this.selectedId,state:this.selectedState,district:this.selectedDistrict,block:this.selectedBlock}
    }
    this.subs.add=this.apiInfoService.transferVolunteer(this.putData).subscribe((data)=>{
    this.volunteerDetailsDataSource=data;
    this.firstName=data.firstName;
    console.log(data.firstName);
    // this.message=data.message;
    // this.volunteerObj=data;
    console.log(data.message);
    let message= this.volunteerObj.firstName+" Have been transferred to "+this.selectedState+","+this.selectedDistrict+""+this.selectedBlock+"";
    if(data && data.message=='Success'){
      //message="Something went wrong";
      this.dialogRef.close({transfer:true});
    }
    else{
      //this.dialogRef.close();
      message="Something went wrong";
    }
    this.showNotification({message: message,success:true});
    
  });
    
}
  }
 
  ngOnDestroy(){
    this.subs.dispose();
  }


showNotification(notificationData,duration=2000){
this.snackBar.openFromComponent(NotificationMessageComponent,{
  data:notificationData,
  duration:duration,
  panelClass: "notification-snackbar"
});
}


}
