import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { LocationService } from '../../services/location.service';
import { FormGroup, FormControl } from '@angular/forms';

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
export class SeniorCitizensListComponent implements OnInit {
  
  AssignedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName','volunteerId'];
  UnassignedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName'];
  DeboardedSeniorCitizensColumns: string[] = ['firstName', 'phoneNo', 'state','district','blockName','volunteerId','deboardedOn','reasons'];
  AssignedDataSource;
  UnassignedDataSource;
  DeboardedDataSource;
  
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
  constructor(private apiInfoService:ApiInfoService, private locationService:LocationService) { }

  ngOnInit(): void {

    this.base_url=environment.base_url;
    
    let postData={status:"Assigned",limit:this.itemsPerPage,pagenumber:0};
    let unassignedPostData={status:"Unassigned",limit:this.itemsPerPage,pagenumber:0};
    let deBoardedPostData={status:"Deboarded",limit:this.itemsPerPage,pagenumber:0};

    this.getPageData(postData);
    this.getUnassignedPageData(unassignedPostData);
    this.getDeboardedPageData(deBoardedPostData);
    this.getStates();
    this.status = 'Assigned';
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

}
