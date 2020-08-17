import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
// import {MatTabsModule} from '@angular/material/tabs';

export interface PeriodicElement {
  name: string;
  position: number;
  rating: number;
  contactNumber: number;
  state:string;
  district:string;
  block:string;
  assignedSrCitizen:any;
  actions:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Surya Teja', rating: 4.5, contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 2, name: 'James', rating: 3, contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedSrCitizen:40, actions:''},
  {position: 3, name: 'Uma Ram', rating: 4, contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedSrCitizen:20, actions:''},
  {position: 4, name: 'Laxmi', rating: 3, contactNumber: 9640140969,state:'MP',district:'rangareddy', block:'Block2', assignedSrCitizen:20, actions:''},
  {position: 5, name: 'Anderson', rating: 4, contactNumber: 9640140599,state:'Gujarat',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 6, name: 'Ganesh', rating: 4.5, contactNumber: 9640140949,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 7, name: 'Ashita', rating: 3, contactNumber: 9640140399,state:'Gujarat',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 8, name: 'Deen Dayal', rating: 3, contactNumber: 9640140929,state:'Maharashtra',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 9, name: 'Soma', rating: 4, contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 10, name: 'Hakuna', rating: 4, contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
  {position: 11, name: 'Hakunam', rating: 5, contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedSrCitizen:20, actions:''},
];

/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'rating', 'contactNumber', 'state','district','block','assignedSrCitizen','actions'];
  dataSource = ELEMENT_DATA;
  links = ['Active Volunteers', 'Deboarded Volunteers'];
  activeLink = this.links[0];
  // background: ThemePalette = undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
