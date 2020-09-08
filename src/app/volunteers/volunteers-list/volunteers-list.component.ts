import { Component, OnInit, ViewChild , EventEmitter, Input,  Output, OnDestroy} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { MatSort } from '@angular/material/sort';
import { ApiInfoService } from 'src/app/services/api-info.service';
import {ActivatedRoute,Router, ParamMap} from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import{LocationService} from '../../services/location.service';
import { identifierModuleUrl } from '@angular/compiler';



import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';

export interface DeboarededVolunteers {
  name: string; 
  position: number;  
  rating: number;
  contactNumber: number;
  state:string;
  district:string;
  block:string;
  assignedSrCitizen:any;
  
}

/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */


@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {
  createFilterGroup: FormGroup;
  states: {};
  districts: {};
  blocks:{};

  // filterState:string;
  // filterDistrict:string;
  // filterBlock:string;
  statesList:string[];
  districtsList:string[];
  blocksList:string[];
  selectedState:string;
  selectedDistrict:string;
  selectedBlock:string;
  selectedSort:any;
  sortBy;
  sortBys: string[] = [
    'SortBy','rating','assignedSrCitizen'
  ];

 




  dataSource:any[];
  displayedColumns: string[] = [ 'firstName','rating' ,'phoneNo', 'state','district','block', 'count_SrCitizen','actions'];
  deboardedDataSource; 
  deboardedColumns: string[] = [  'firstName', 'rating','phoneNo', 'state','district','block','count_SrCitizen'];
  // dataSource1 = new MatTableDataSource(this.DEBOARDED_VOLUNTEER);
  
  links = ['Active Volunteers', 'Deboarded Volunteers'];
  activeLink = this.links[0];

  actions:any[]=[];
 


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  // startIndex=0;
  // endIndex=12;
  // length;
  // pageSize;
//  config:any;
//  collection = [];

data:Array<any>;
totalRecords: String;
page:Number=1;
//pageSize:Number=7;
itemsPerPage:Number=7;
  
 public base_url;
 public selectedId;
  exampleDatabase: any;
  active_total;
 p;
 p1;
 public subs = new SubscriptionsContainer();
 constructor(public dialog:MatDialog,private apiInfoService:ApiInfoService, private route:ActivatedRoute, private router:Router,private locationService:LocationService) {
   this.data=Array<any>();
 }

 @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
    let postData={status:"Active",limit:this.itemsPerPage,pagenumber:0};
    // postData.status="Active";
    this.getPageData(postData);
    this.getStates();
    this.deboarededVolunteerList();

  // If the user changes the sort order, reset back to the first page.
  // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  // merge(this.sort.sortChange)
  //   .pipe(
  //     startWith({}),
  //     switchMap(() => {
  //       this.isLoadingResults = true;
  //       return this.exampleDatabase!.getRepoIssues(
  //         this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //     }),
  //     map(data => {
  //       // Flip flag to show that loading has finished.
  //       this.isLoadingResults = false;
  //       this.isRateLimitReached = false;
  //       // this.resultsLength = data;

  //       return data;
  //     }),
  //     catchError(() => {
  //       this.isLoadingResults = false;
  //       // Catch if the GitHub API has reached its rate limit. Return empty data.
  //       this.isRateLimitReached = true;
  //       return observableOf([]);
  //     })
  //   ).subscribe(data => this.dataSource = data);
}

// paginate(event: any) {
//   this.dataSource = this.source_data.slice(event * 5 - 5, event * 5);
// }
  getPaginationData(e){
    let postData={status:"Active",limit:this.itemsPerPage,pagenumber:e-1};
    // postData.status="Active";
    this.getPageData(postData);
  }
  getPageData(postData){
    this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      console.log(data);
      this.dataSource=data.volunteers;
      this.active_total=50;
      // this.dataSource=new MatTableDataSource(data.volunteers);
      // this.dataSource.sort=this.sort;
      // this.dataSource.paginator=this.paginator;
      // this.totalRecords=data.volunteers.length;
      // this.resultsLength=data.volunteers.length;
     });
  }
  getStates(){
    this.statesList=this.locationService.getStates();
    console.log(this.statesList);
    // this.locationService.getStates();
    // this.getDistricts(selectedState);
    
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
      this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
      //   this.dataSource.sort=this.sort;
      // this.dataSource.paginator=this.paginator;
      this.states=data.volunteers.states;
      this.totalRecords=data.volunteers.length;
      this.resultsLength=data.volunteers.length;
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
        )};
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
      this.totalRecords=data.volunteers.length;
      this.resultsLength=data.volunteers.length;
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
      this.totalRecords=data.volunteers.length;
      this.resultsLength=data.volunteers.length;
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
  

  onChangeSort(selectedSortBy) {
    if (selectedSortBy) {
      let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock,sortBy:selectedSortBy,sortType:"ASC"}
      this.subs.add=this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
        // this.filterState=data.volunteers.state;
        // this.filterDistrict=data.volunteers.district;
        // this.filterBlock=data.volunteers.block;
        
                }
      )};
  }
  

    deboarededVolunteerList(){
        // let postData={status:"Deboarded"};
    
    this.subs.add=this.apiInfoService.getDeboardedVolunteersList().subscribe(data=>{
      this.deboardedDataSource=data.volunteers;
    })
}

transferVolunteer(){
  // let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock}
  // this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
  //   this.dataSource=data.volunteers;
    // console.log("abc");
  // });
}


// getArrayFromNumber(length){
//   return new Array(length/10);
// }

// updateIndex(pageIndex){
//   this.startIndex=pageIndex*10;
//   this.endIndex=this.startIndex+10;
//   console.log(pageIndex);
// }

// pageChange1(pagenumber){
//     this.base_url=environment.base_url;
//     let postData={status:"Active",pagenumber=1};
//     this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
//       console.log(data);
//       this.dataSource=data.volunteers;
//       this.states=this.dataSource;
//       this.districts=this.dataSource;
//       this.blocks=this.dataSource;
  
//   }
// }

  opensrCitizenAssign(){
    let congigObject ={
      data:{
        heading:"Assign Sr.citizens",
        feature: "assignCitizensSingleVolunteer"
      },
      disableClose:true,
      width: "70%",
      autoFocus: false,
      //position:{top:"50px"},
      //height:"500px"
    };
    this.openGlobalPopup(congigObject);
  }
  addVolunteers(){
    let congigObject ={
      data:{
        heading:"Add Volunteer",
        feature: "addVolunteer"
      },
      disableClose:true,
      width: "50%",
      autoFocus: false,
      //position:{top:"50px"},
      //height:"500px"
    };
    this.openGlobalPopup(congigObject);
  }
  openGlobalPopup(configurationObject){
    this.dialog.open(GlobalDialogComponent,configurationObject);
  }
  ngOnDestroy(){
    this.subs.dispose();
  }
  volunteerDetails(element){
    this.router.navigate(['volunteers/VolunteerDetailView',{id: element.idvolunteer}]);
  }

}