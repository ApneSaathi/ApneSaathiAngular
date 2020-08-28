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

 

  DEBOARDED_VOLUNTEER: DeboarededVolunteers[] = [
    {position: 1, name: 'Surya Teja', rating: 4.5, contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 2, name: 'James', rating: 3, contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedSrCitizen:40, },
    {position: 3, name: 'Uma Ram', rating: 4, contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedSrCitizen:20, },
    {position: 9, name: 'Soma', rating: 4, contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 10, name: 'Hakuna', rating: 4, contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 11, name: 'Hakunam', rating: 5, contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  ];
  

  displayedColumns: string[] = [ 'firstName', 'phoneNo', 'state','district','block', 'actions'];
  dataSource ;

  deboardedColumns: string[] = [  'firstName', 'phoneNo', 'state','district','block',];
  dataSource1 = new MatTableDataSource(this.DEBOARDED_VOLUNTEER);
  
  links = ['Active Volunteers', 'Deboarded Volunteers'];
  activeLink = this.links[0];

  actions:any[]=[];
  states: string[] = [

  ];


  districts: string[] = [
 
  ];


  blocks: string[] = [

    'block1','block2','block3','Guntur','Kadapa','Krishna','Kurnool','Nellore','Prakasam','Srikakulam','Visakhapatnam','Vizianagaram','West Godavari',

    'Anjaw','Siang','Changlang','Dibang Valley','East Kameng','East Siang','Kamle','Kra Daadi','Kurung Kumey','Lepa Rada *','Lohit','Longding','Lower Dibang Valley','Lower Siang','Lower Subansiri','Namsai','Pakke Kessang *','Papum Pare','Shi Yomi *','Tawang','Tirap','Upper Siang','Upper Subansiri','West Kameng','West Siang',

  ];


  sortBys: string[] = [

    'Rating', 'AssignedSrCitizen', 'phoneNo',
  

  ];


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
 constructor(public dialog:MatDialog,private apiInfoService:ApiInfoService, private route:ActivatedRoute, private router:Router) {
   this.data=Array<any>();
 }

 @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  ngOnInit(): void {
    this.base_url=environment.base_url;
    let postData={status:"Active"};
    // postData.status="Active";
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      // console.log(data);
      this.dataSource=data.volunteers;
      // this.collection=data.volunteers;
      this.states=this.dataSource;
      this.districts=this.dataSource;
      this.blocks=this.dataSource;
     
// this.data=data.volunteers;
  })

  }

deboarededVolunteerList(){
  let postData={status:"Active"};
    
    this.apiInfoService.postDeboardedVolunteersList(postData).subscribe((data)=>{
    this.dataSource=data.volunteers;
    })
}
  getData(){
    let postData={status:"Active",limit:10,pagenumber:0};
    this.apiInfoService.postVolunteersListPagination(postData).subscribe((data)=> 
    {console.log(data),
    this.dataSource=data.volunteers,
    // this.data=data.volunteers,
    this.totalRecords=data.volunteers.length;
    }
    )
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