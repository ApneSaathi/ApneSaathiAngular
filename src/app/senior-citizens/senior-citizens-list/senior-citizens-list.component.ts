import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { LocationService } from '../../services/location.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';

/* export interface PeriodicElement {
     name: string;
     position: number;
     contactNumber: number;
     state:string;
     district:string;
     block:string;
     assignedVolunteer:any;
 }*/



@Component({
  selector: 'app-senior-citizens-list',
  templateUrl: './senior-citizens-list.component.html',
  styleUrls: ['./senior-citizens-list.component.scss']
})
export class SeniorCitizensListComponent implements OnInit, OnDestroy {
  
  AssignedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName','volunteerId'];
  UnassignedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName'];
  DeboardedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName','volunteerId','deboardedOn','reasons'];
  AssignedDataSource;
  UnassignedDataSource;
  DeboardedDataSource;
  UnassignedCitizenDataSource;
  
  links = ["Assigned Sr. Citizen's", "Unassigned Sr. Citizen's", "Deboarded Sr. Citizen's"];
  activeLink = this.links[0];

  public base_url;
  itemsPerPage:Number=7;
  assigned_total;
  unassigned_total;
  status='';
  p2;
  p1;
  public noData={message:''};
  public loadingSpinner:boolean=true;
  public subs = new SubscriptionsContainer();
  deboarded_total;
  statesList: any;
  districtsList: any;
  blocksList: any;
  selectedState:string='';
  selectedDistrict:string='';
  selectedBlock:string='';
  createFilterGroup: FormGroup;
  assignCitizenForm=this.fb.group({
    selectedCitizens: this.fb.array([])
  });
  selectedCitizensQueue=[];
  disable_assign_button:boolean=true;
  public dialogReference;
  constructor(
    private apiInfoService:ApiInfoService,
    private locationService:LocationService,
    private fb:FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  // get the selectedCitizens form element
  get selectedCitizens(){
    return this.assignCitizenForm.get('selectedCitizens') as FormArray;
  }
  ngOnInit(): void {

    this.base_url=environment.base_url;

    this.apiInfoService.getUnassignedSeniorCitizensList({status: "Unassigned"}).subscribe((data) => {
      this.UnassignedCitizenDataSource = data.srCitizenList;
    })
    
    let postData={status:"Assigned",limit:this.itemsPerPage,pagenumber:0};
    let unassignedPostData={status:"Unassigned",limit:this.itemsPerPage,pagenumber:0};
    let deBoardedPostData={status:"Deboarded",limit:this.itemsPerPage,pagenumber:0};

    this.getPageData(postData);
    this.getUnassignedPageData(unassignedPostData);
    this.getDeboardedPageData(deBoardedPostData);
    this.getStates();
    this.status = 'Assigned';
    // enabling assign citizens button
    // this.subs.add=this.assignCitizenForm.get('selectedCitizens').valueChanges
    // .subscribe(value=> {
    //   if(this.selectedCitizensQueue.length > 0){
    //     this.disable_assign_button=false;
    //   }
    //   else{
    //     this.disable_assign_button=true;
    //   }
    //   console.log("Selected Citizens Queue:",this.selectedCitizensQueue);
    //   console.log("Form:",this.assignCitizenForm);
    // })
  }
  // Dynamic implementation of selected citizens form element 
  addSelectCitizens(){
    this.UnassignedDataSource.forEach(element => {
      //console.log(element);
      let elementValue=false;
      if(this.selectedCitizensQueue.findIndex(citizen=> { 
        return element['srCitizenId'] == citizen['srCitizenId'];
      }) != -1){
        elementValue=true;
      }
      this.selectedCitizens.push(
        this.fb.group({
          id: [element['srCitizenId']],
          checked:[elementValue]
        })
        );
    });  
  }
  /**
   * onchecked function is to handle individual check/uncheck of sr Citizen
   * @param event 
   */
  onchecked(event,citizenObject){
    if(event.checked){
      this.selectedCitizensQueue.push(citizenObject);
    }
    else{
      this.selectedCitizensQueue= this.selectedCitizensQueue.filter(citizen=>{
        return citizen['srCitizenId']!=citizenObject['srCitizenId'];
      })
    }
    if(this.selectedCitizensQueue.length > 0){
      this.disable_assign_button=false;
    }
    else{
      this.disable_assign_button=true;
    }
    console.log("Selected Citizens Queue:",this.selectedCitizensQueue)
  }
  getStates(){
    this.statesList=this.locationService.getStates();
  }

  getDistricts(){
    this.districtsList=this.locationService.getDistricts(this.selectedState);
    console.log(this.districtsList);
  }

getBlocks(){
  this.blocksList=this.locationService.getBlocks(this.selectedState,this.selectedDistrict);
    console.log(this.blocksList);
}

  getPaginationData(e){
    let postData={status:"Assigned",limit:this.itemsPerPage,pagenumber:e-1};
    if(this.selectedState){
      postData['filterState']=this.selectedState;
    }
    if(this.selectedDistrict){
      postData['filterDistrict']=this.selectedDistrict;
    }
    if(this.selectedBlock){
      postData['filterBlock']=this.selectedBlock;
    } 
    //postData.status="Assigned";
    this.getPageData(postData);
  }
  getPageData(postData){
    this.loadingSpinner=true;
    this.subs.add=this.apiInfoService.getAssignedSeniorCitizensList(postData).subscribe((data) => {
      this.AssignedDataSource = data.srCitizenList;
      this.assigned_total=data.totalSrCitizen?data.totalSrCitizen:0;
      this.noData.message='';
      this.loadingSpinner=false;
      if(postData.pagenumber===0 || postData.pagenumber==='0'){
        this.p1=1;
      }
     },
     errorResponse=>{
       console.log("error:",errorResponse);
       if(errorResponse.error.statusCode ==1){
        this.noData.message="No Records Found"; 
       }
      else{
        this.noData.message="Something went wrong";
      }
      this.AssignedDataSource=[];
      this.assigned_total=0;
      this.loadingSpinner=false;
     });
  }

  getUnassignedPaginationData(e){
    let postData={status:"Unassigned",limit:this.itemsPerPage,pagenumber:e-1};
    if(this.selectedState){
      postData['filterState']=this.selectedState;
    }
    if(this.selectedDistrict){
      postData['filterDistrict']=this.selectedDistrict;
    }
    if(this.selectedBlock){
      postData['filterBlock']=this.selectedBlock;
    } 
    // postData.status="UnAssigned";
    
    
    this.getUnassignedPageData(postData);
  }
  getUnassignedPageData(postData){
    this.loadingSpinner=true;
    this.subs.add=this.apiInfoService.getUnassignedSeniorCitizensList(postData).subscribe((data) => {
      this.UnassignedDataSource = data.srCitizenList;
      this.unassigned_total=data.totalSrCitizen?data.totalSrCitizen:0;
      this.noData.message='';
      this.loadingSpinner=false;
      if(postData.pagenumber===0 || postData.pagenumber==='0'){
        this.p1=1;
        this.selectedCitizensQueue=[];
        this.disable_assign_button=true;
      }
      this.assignCitizenForm.reset();
      this.selectedCitizens.clear();
      this.addSelectCitizens();
      console.log(this.assignCitizenForm);
     },
     errorResponse=>{
       console.log("error:",errorResponse);
       if(errorResponse.error.statusCode ==1){
        this.noData.message="No Records Found"; 
       }
      else{
        this.noData.message="Something went wrong";
      }
      this.UnassignedDataSource=[];
      this.unassigned_total=0;
      this.loadingSpinner=false;
     });
  }

  getDeboardedPaginationData(e) {
    let postData={status:"Deboarded",limit:this.itemsPerPage,pagenumber:e-1};
    if(this.selectedState){
      postData['filterState']=this.selectedState;
    }
    if(this.selectedDistrict){
      postData['filterDistrict']=this.selectedDistrict;
    }
    if(this.selectedBlock){
      postData['filterBlock']=this.selectedBlock;
    }
    // postData.status="Deboarded";
    this.getDeboardedPageData(postData);
  }

  getDeboardedPageData(postData){
    this.loadingSpinner=true;
    this.subs.add=this.apiInfoService.getAssignedSeniorCitizensList(postData).subscribe((data) => {
      this.DeboardedDataSource = data.srCitizenList;

      this.deboarded_total=data.totalSrCitizen?data.totalSrCitizen:0;
      this.noData.message='';
      this.loadingSpinner=false;
      if(postData.pagenumber===0 || postData.pagenumber==='0'){
        this.p1=1;
      }
     },
     errorResponse=>{
       console.log("error:",errorResponse);
       if(errorResponse.error.statusCode ==1){
        this.noData.message="No Records Found"; 
       }
      else{
        this.noData.message="Something went wrong";
      }
      this.DeboardedDataSource=[];
      this.deboarded_total=0;
      this.loadingSpinner=false;
     });
  }

  onTabChanged(e){
    this.selectedState = '';
    this.selectedDistrict = '';
    this.selectedBlock = '';
  }

  onChangeState(selectedState, status) {
    if(selectedState=="State" || selectedState=='' || !selectedState){
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0};
      selectedState=null;
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
      this.blocksList=null;
      this.districtsList=null;
      }
     
    if (selectedState) {
      this.getDistricts();
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0,filterState:this.selectedState};
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
    }
  }

  onChangeDistrict(selectedDistrict, status) {
    if(selectedDistrict=="District" || selectedDistrict=='' || !selectedDistrict){
      this.getDistricts();
      selectedDistrict=null;
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0};
      if(this.selectedState!=''){
        postData['filterState']=this.selectedState;
      }
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
      this.blocksList=null;
    }

    if (selectedDistrict) {
      this.getBlocks();
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0,filterState:this.selectedState,filterDistrict:this.selectedDistrict};
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
    };
  }


  onChangeBlock(selectedBlock, status) {
    if(selectedBlock=="Block" || selectedBlock=='' || !selectedBlock){
      this.getBlocks();
      selectedBlock=null;
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0};
      if(this.selectedState!=''){
        postData['filterState']=this.selectedState;
      }
      if(this.selectedDistrict!=''){
        postData['filterDistrict']=this.selectedDistrict;
      }
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
  }
    if (selectedBlock) {
      let postData={status:status,limit:this.itemsPerPage,pagenumber:0,filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock};
      if(status === 'Assigned') {
        this.getPageData(postData);
      } else if(status === 'Unassigned') {
        this.getUnassignedPageData(postData);
      } else {
        this.getDeboardedPageData(postData);
      }
    };
  }



resetAssigned(){
  this.selectedState='';
  this.selectedDistrict='';
  this.selectedBlock='';
  let postData={status:"Assigned",limit:this.itemsPerPage,pagenumber:0}
  this.getPageData(postData);

}

resetUnassigned(){
  this.selectedState='';
  this.selectedDistrict='';
  this.selectedBlock='';
  let postData={status:"Unassigned",limit:this.itemsPerPage,pagenumber:0}
  this.getUnassignedPageData(postData);
}

resetDeboarded(){
  this.selectedState='';
  this.selectedDistrict='';
  this.selectedBlock='';
  let postData={status:"Deboarded", limit:this.itemsPerPage,pagenumber:0}
  this.getDeboardedPageData(postData);
}

  /**
   * assignToVolunteers function is to open distribute citizens to volunteer popup
   */
  assignToVolunteers(){
    let congigObject ={
      data:{
        heading:"Assign Volunteers",
        headingRightContent:"Selected sr.citizens Count: "+this.selectedCitizensQueue.length,
        feature: "distributeSrCitizensEqually",
        citizensObj: this.selectedCitizensQueue,
      },
      disableClose:true,
      width: "90%",
      autoFocus: false,
      panelClass: "assign-popup"
      //position:{top:"50px"},
      //height:"500px"
    };
    congigObject.data['inputObj']={};
    congigObject.data['inputObj']['feature']='distributeSrCitizensEqually';
    if(this.selectedState!=''){
      congigObject.data['inputObj']['filterState']=this.selectedState;
    }
    if(this.selectedDistrict!=''){
      congigObject.data['inputObj']['filterDistrict']=this.selectedDistrict;
    }
    this.openGlobalPopup(congigObject);
    this.dialogReference.afterClosed().subscribe(dialogResponse=>{
      if(dialogResponse.transfer){
        let message="Senior Citizen's has been assigned to the selected volunteers";
        this.showNotification({message,success:true});
        this.getUnassignedPaginationData(1);
        this.getPaginationData(1);
        
      }
      else{
        let message="Assigning of sr.citizens has been cancelled or failed";
        this.showNotification({message,success:false})
      }
    });
  }
  openGlobalPopup(configurationObject){
    this.dialogReference=this.dialog.open(GlobalDialogComponent,configurationObject);
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
