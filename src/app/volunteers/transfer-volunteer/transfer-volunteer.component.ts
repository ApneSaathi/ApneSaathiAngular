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

@Component({
  selector: 'app-transfer-volunteer',
  templateUrl: './transfer-volunteer.component.html',
  styleUrls: ['./transfer-volunteer.component.scss']
})
export class TransferVolunteerComponent implements OnInit {

  @Input() volunteerObj;
  transferVolunteerForm=this.fb.group({
    
  });

// public srCitizensList:object[];
public dataSource;
public base_url;
public enable_assign_button:boolean=true;
public loadingSpinner:boolean = true;
public subs= new SubscriptionsContainer();
public selectedState;
public selectedDistrict;
public selectedBlock;
public displayedColumns=["firstName"];

public transferVolunteerDetails:boolean=false;
selectedId: number;

states: {};
districts: {};
blocks:{};
statesList: any;
districtsList: string[];
blocksList: any;

firstName:any;




  constructor(private fb: FormBuilder,private route:ActivatedRoute,
    private api_info: ApiInfoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GlobalDialogComponent>,private locationService:LocationService,private apiInfoService:ApiInfoService,public dialog:MatDialog) { }

   

    transferVolunteer(){
      console.log("mpq");
      this.apiInfoService.getVolunteerDetails(this.selectedId).subscribe((data)=>
      this.dataSource=data.volunteers,
     
      // this.firstName=this.dataSource.firstName
      )
console.log(this.dataSource);


      // let congigObject ={
      //     data:{
      //       heading:"Transfer Location of Volunteer",
      //       feature: "transferVolunteer",
            
      //     },
      //     disableClose:true,
      //     width: "50%",
      //     height:"50%",
      //     autoFocus: false,
      //     //position:{top:"50px"},
      //     //height:"500px"
      //   };
      //   this.openGlobalPopup(congigObject);
      }
    
  
    // openGlobalPopup(configurationObject){
    //   this.dialog.open(GlobalDialogComponent,configurationObject);
    // }


  ngOnInit(): void {

    // parameter defining for API Call 
    // let postData={status:"Active", idVolunteer:this.volunteerObj }
    //   this.api_info.getVolunteerDetails(postData).subscribe((data)=>
    //     this.dataSource=data.volunteers,


    //   );
   
     
    //     this.enable_assign_button=true;
    this.base_url=environment.base_url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
    this.transferVolunteer();
    this.selectedState="State";
    this.selectedDistrict="District";
    this.selectedBlock="Block";
    this.getStates();
    console.log(this.selectedId);
  }

  getStates(){
    this.statesList=this.locationService.getStates();
    console.log(this.statesList);
    // this.locationService.getStates();
    // this.getDistricts(selectedState);
    
  }

  // showNotification(notificationData){
  //   this.snackBar.openFromComponent(NotificationMessageComponent,{
  //     data:notificationData,
  //     duration:2000,
  //     panelClass: "notification-snackbar"
  //   });
  // }
  // ngOnDestroy(){
  //   this.subs.dispose();
  // }
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
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    //   this.dataSource.sort=this.sort;
    // this.dataSource.paginator=this.paginator;
    this.states=data.volunteers.states;
    // this.totalRecords=data.volunteers.length;
    // this.resultsLength=data.volunteers.length;
    this.blocksList=null;
      // this.filterState=null;
      this.districtsList=null;
  });
  }
if (selectedState) {
    this.getDistricts();
      let postData={status:"Active",filterState:this.selectedState}
      this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
                }
      )}
// else{
//   console.log("abc");
//   }
    }


onChangeDistrict(selectedDistrict) {
  if(selectedDistrict=="District"){
    this.getDistricts();
    selectedDistrict=null;
    let postData={status:"Active",filterState:this.selectedState}
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    //   this.dataSource.sort=this.sort;
    // this.dataSource.paginator=this.paginator;
    // this.totalRecords=data.volunteers.length;
    // this.resultsLength=data.volunteers.length;
    this.blocksList=null;
      // this.filterState=null;
      // this.districtsList=null;
  });
 
}

  if (selectedDistrict) {
    this.getBlocks();
    let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict}
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
              }
    )};
}


onChangeBlock(selectedBlock) {
  if(selectedBlock=="Block"){
    this.getBlocks();
    selectedBlock=null;
    let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict}
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
    //   this.dataSource.sort=this.sort;
    // this.dataSource.paginator=this.paginator;
    // this.totalRecords=data.volunteers.length;
    // this.resultsLength=data.volunteers.length;
      // this.filterState=null;
      this.blocksList=null;
  });
 
}
  if (selectedBlock) {
    let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock}
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      this.dataSource=data.volunteers;
      // this.filterState=data.volunteers.state;
      // this.filterDistrict=data.volunteers.district;
      // this.filterBlock=data.volunteers.block;
              }
    )};
}



}
