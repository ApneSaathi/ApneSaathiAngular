import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  contactNumber: number;
  state:string;
  district:string;
  block:string;
  assignedVolunteer:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Surya Teja', contactNumber: 9640140999,state:'Telangana',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 2, name: 'James', contactNumber: 9640140979,state:'Maharashtra',district:'Loreimpsum', block:'Block1', assignedVolunteer:40},
  {position: 3, name: 'Uma Ram', contactNumber: 9640140989,state:'Gujarat',district:'rangareddy', block:'Block2', assignedVolunteer:20},
  {position: 4, name: 'Laxmi', contactNumber: 9640140969,state:'MP',district:'rangareddy', block:'Block2', assignedVolunteer:20},
  {position: 5, name: 'Anderson', contactNumber: 9640140599,state:'Gujarat',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 6, name: 'Ganesh', contactNumber: 9640140949,state:'Telangana',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 7, name: 'Ashita', contactNumber: 9640140399,state:'Gujarat',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 8, name: 'Deen Dayal', contactNumber: 9640140929,state:'Maharashtra',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 9, name: 'Soma', contactNumber: 9640140919,state:'MP',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 10, name: 'Hakuna', contactNumber: 9640140909,state:'Telangana',district:'rangareddy', block:'Block1', assignedVolunteer:20},
  {position: 11, name: 'Hakunam', contactNumber: 9640141909,state:'Telangana',district:'rangareddy', block:'Block1', assignedVolunteer:20},
];

@Component({
  selector: 'app-senior-citizens-list',
  templateUrl: './senior-citizens-list.component.html',
  styleUrls: ['./senior-citizens-list.component.scss']
})
export class SeniorCitizensListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'contactNumber', 'state','district','block','assignedVolunteer'];
  dataSource = ELEMENT_DATA;
  links = ["Assigned Sr. Citizen's", "Unassigned Sr. Citizen's", "Deboarded Sr. Citizen's"];
  activeLink = this.links[0];

  public base_url;
  constructor() { }

  ngOnInit(): void {
    this.base_url=environment.base_url;
  }

}
