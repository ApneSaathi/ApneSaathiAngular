import { Component, OnInit, ViewChild } from '@angular/core';
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


// import {MatTabsModule} from '@angular/material/tabs';
// import {Volunteers} from 'src/app/volunteers/volunteers.mode';
// export interface VolunteerDetails {
//   firstName: string; 
//   position: number;  
//   rating: number;
//   contactNumber: number;
//   state:string;
//   district:string;
//   block:string;
//   assignedSrCitizen:any;
//   actions:any;
//   status:any;
//   idVolunteer:number;
// }

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





// var opost:VolunteerDetails;
// opost.name="";
// opost.status="Active";
// opost.idVolunteer=null;

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {

  // VOLUNTEER_DATA: VolunteerDetails[] = [
  //   {position: 1, name: 'Surya Teja', rating: 4.5, contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 2, name: 'James', rating: 3, contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedSrCitizen:40, actions:''},
  //   {position: 3, name: 'Uma Ram', rating: 4, contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedSrCitizen:20, actions:''},
  //   {position: 4, name: 'Laxmi', rating: 3, contactNumber: 9640140969,state:'MP',district:'rangareddy', block:'Block2', assignedSrCitizen:20, actions:''},
  //   {position: 5, name: 'Anderson', rating: 4, contactNumber: 9640140599,state:'Gujarat',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 6, name: 'Ganesh', rating: 4.5, contactNumber: 9640140949,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 7, name: 'Ashita', rating: 3, contactNumber: 9640140399,state:'Gujarat',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 8, name: 'Deen Dayal', rating: 3, contactNumber: 9640140929,state:'Maharashtra',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 9, name: 'Soma', rating: 4, contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 10, name: 'Hakuna', rating: 4, contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  //   {position: 11, name: 'Hakunam', rating: 5, contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  // ];

  DEBOARDED_VOLUNTEER: DeboarededVolunteers[] = [
    {position: 1, name: 'Surya Teja', rating: 4.5, contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 2, name: 'James', rating: 3, contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedSrCitizen:40, },
    {position: 3, name: 'Uma Ram', rating: 4, contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedSrCitizen:20, },
    {position: 9, name: 'Soma', rating: 4, contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 10, name: 'Hakuna', rating: 4, contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
    {position: 11, name: 'Hakunam', rating: 5, contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, },
  ];
  
  // objPost:VolunteerDetails;

  displayedColumns: string[] = [ 'firstName', 'phoneNo', 'state','district','block', 'actions'];
  dataSource ;

  deboardedColumns: string[] = [ 'name', 'rating', 'contactNumber', 'state','district','block','assignedSrCitizen','actions'];
  dataSource1 = new MatTableDataSource(this.DEBOARDED_VOLUNTEER);
  
  links = ['Active Volunteers', 'Deboarded Volunteers'];
  activeLink = this.links[0];
  // background: ThemePalette = undefined;

  // abc:VolunteerDetails[];
  // states: string
  actions:any[]=[];
  states: string[] = [

    // 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',

    // 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',

    // 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',

    // 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',

    // 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'

  ];


  districts: string[] = [

    // 'Anantapur','Chittoor','East Godavari','Guntur','Kadapa','Krishna','Kurnool','Nellore','Prakasam','Srikakulam','Visakhapatnam','Vizianagaram','West Godavari',

    // 'Anjaw','Siang','Changlang','Dibang Valley','East Kameng','East Siang','Kamle','Kra Daadi','Kurung Kumey','Lepa Rada *','Lohit','Longding','Lower Dibang Valley','Lower Siang','Lower Subansiri','Namsai','Pakke Kessang *','Papum Pare','Shi Yomi *','Tawang','Tirap','Upper Siang','Upper Subansiri','West Kameng','West Siang',

  ];



  blocks: string[] = [

    'block1','block2','block3','Guntur','Kadapa','Krishna','Kurnool','Nellore','Prakasam','Srikakulam','Visakhapatnam','Vizianagaram','West Godavari',

    'Anjaw','Siang','Changlang','Dibang Valley','East Kameng','East Siang','Kamle','Kra Daadi','Kurung Kumey','Lepa Rada *','Lohit','Longding','Lower Dibang Valley','Lower Siang','Lower Subansiri','Namsai','Pakke Kessang *','Papum Pare','Shi Yomi *','Tawang','Tirap','Upper Siang','Upper Subansiri','West Kameng','West Siang',

  ];


  sortBys: string[] = [

    'Rating', 'AssignedSrCitizen', 'contactNumber',
  

  ];





  
  

  

 config:any;
 collection = [];
 public base_url;
 constructor(public dialog:MatDialog,private apiInfoService:ApiInfoService, private route:ActivatedRoute, private router:Router) 
{
  this.config={
    currentPage:1,
    itemsPerPage:10,
    totalitems:0,
  };
    route.queryParams.subscribe(
    params=>this.config.currentPage=params['page'] ? params['page']:1 
    )
      for(let i=1;i<=100;i++){
        this.collection.push('items $(i)');
      }

}
 
pageChange(newPage: number){
  this.router.navigate([''],{queryParams:{page: newPage}});
}



  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  
  ngOnInit(): void {
    this.base_url=environment.base_url;
    let postData={status:"Active"};
    // postData.status="Active";
    this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
      console.log(data);
      this.dataSource=data.volunteers;
      this.states=this.dataSource;
      this.districts=this.dataSource;
      this.blocks=this.dataSource;
      // this.sortBys=
      // console.log(this.states);
      // this.objPost=data;
    // this.dataSource.sort = this.sort;
  })

  }

  // pageChange1(){
  //   this.base_url=environment.base_url;
  //   let postData={status:"Active",pagenumber=1};
  //   this.apiInfoService.postVolunteersList(postData).subscribe((data) => {
  //     console.log(data);
  //     this.dataSource=data.volunteers;
  //     this.states=this.dataSource;
  //     this.districts=this.dataSource;
  //     this.blocks=this.dataSource;
  
  // }


  opensrCitizenAssign(volunteer){
      this.dialog.open(GlobalDialogComponent,
        {
          data:{
            heading:"Assign Sr.citizens",
            volunteerObj: volunteer
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
