import { Component, OnInit, ViewChild , EventEmitter, Input,  Output} from '@angular/core';
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
import {ActivatedRoute,Router} from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import{LocationService} from '../../services/location.service';



import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

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

  filterState:string;
  filterDistrict:string;
  filterBlock:string;
  statesList:string[];
  districtsList:string[];
  blocksList:string[];
  selectedState:string;
  selectedDistrict:string;
  selectedBlock:string;
  selectedSort:string[];
  sortBy;
  sortBys: string[] = [
    'rating','assignedSrCitizen'
  ];

 


//  selectedSorts=this.sortBys.
  // DEBOARDED_VOLUNTEER: DeboarededVolunteers[] = [
  //   {position: 1, name: 'Surya Teja', rating: 4.5, contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  //   {position: 2, name: 'James', rating: 3, contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedSrCitizen:40, },
  //   {position: 3, name: 'Uma Ram', rating: 4, contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedSrCitizen:20, },
  //   {position: 9, name: 'Soma', rating: 4, contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  //   {position: 10, name: 'Hakuna', rating: 4, contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  //   {position: 11, name: 'Hakunam', rating: 5, contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  // ];
  

  dataSource:MatTableDataSource<any[]>;
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
pageSize:Number=10;
itemsPerPage:Number=7;
  
 public base_url;
  exampleDatabase: any;
 constructor(public dialog:MatDialog,private apiInfoService:ApiInfoService, private route:ActivatedRoute, private router:Router,private locationService:LocationService) {
   this.data=Array<any>();
 }

 @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  ngOnInit(): void {
    this.base_url=environment.base_url;
    let postData={status:"Active"};
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      // console.log(data);
      this.dataSource=new MatTableDataSource(data.volunteers);
      // this.states=this.dataSource;
      // this.districts=this.dataSource;
      // this.blocks=this.dataSource;
      this.dataSource.sort=this.sort;
      // this.sortBy=this.dataSource;
// this.createFilterGroup =new FormGroup({
//   filterStates: new FormControl(''),
//   filterDistricts:  new FormControl(''),
//   filterBlocks:  new FormControl(''),
//   // sortBy:  new FormControl(''),

// });

      
  });
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
    if (selectedState) {
      this.getDistricts();
        let postData={status:"Active",filterState:this.selectedState}
        this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
          this.dataSource=data.volunteers;
                  }
        )};
      }


  onChangeDistrict(selectedDistrict) {
    if (selectedDistrict) {
      this.getBlocks();
      let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict}
      this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
                }
      )};
  }


  onChangeBlock(selectedBlock) {
    if (selectedBlock) {
      let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock}
      this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
        this.filterState=data.volunteers.state;
        this.filterDistrict=data.volunteers.district;
        this.filterBlock=data.volunteers.block;
                }
      )};
  }
  

  onChangeSort(selectedSortBy) {
    if (selectedSortBy) {
      let postData={status:"Active",filterState:this.selectedState,filterDistrict:this.selectedDistrict,filterBlock:this.selectedBlock,sortBy:selectedSortBy,sortType:"ASC"}
      this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
        this.dataSource=data.volunteers;
        this.filterState=data.volunteers.state;
        this.filterDistrict=data.volunteers.district;
        this.filterBlock=data.volunteers.block;
        
                }
      )};
  }
  




    deboarededVolunteerList(){
        // let postData={status:"Deboarded"};
    
    this.apiInfoService.getDeboardedVolunteersList().subscribe((data)=>{
    this.deboardedDataSource=data.volunteers;
    })
}








  // getData(){
  //   let postData={status:"Active",limit:10,pagenumber:0};
  //   this.apiInfoService.postVolunteersListPagination(postData).subscribe((data)=> 
  //   {console.log(data),
  //   this.dataSource=data.volunteers;
  //   // this.data=data.volunteers,

  //     if(this.dataSource.filterStates){
  //       this.getDistrict(this.filterStates);
  //     }
  //     if(this.dataSource.filterDistricts){
  //       this.getBlock(this.filterDistricts);
  //     }

  //   this.totalRecords=data.volunteers.length;
  //   }
  //   )
  // }

  

// getState(){
//   let postData={status:"Active",limit:10,pagenumber:0};
//     this.apiInfoService.postVolunteersListDistrict(postData).subscribe((data)=> 
//     {
//      this.dataSource=data.volunteers;
//      this.states=this.dataSource.states;
        
//     }
//     )
// }



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
      this.dialog.open(GlobalDialogComponent,
        {
          data:{
            heading:"Assign Sr.citizens",
          },
          disableClose:true,
          width: "70%",
          autoFocus: false,
          //position:{top:"50px"},
          //height:"500px"
        }
      );
  }
}