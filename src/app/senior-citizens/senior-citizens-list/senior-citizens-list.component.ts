import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';

export interface PeriodicElement {
  name: string;
  position: number;
  contactNumber: number;
  state:string;
  district:string;
  block:string;
  assignedVolunteer:any;
}



@Component({
  selector: 'app-senior-citizens-list',
  templateUrl: './senior-citizens-list.component.html',
  styleUrls: ['./senior-citizens-list.component.scss']
})
export class SeniorCitizensListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'contactNumber', 'state','district','block','assignedVolunteer'];
  dataSource;
  
  links = ["Assigned Sr. Citizen's", "Unassigned Sr. Citizen's", "Deboarded Sr. Citizen's"];
  activeLink = this.links[0];

  public base_url;
  constructor(private apiInfoService:ApiInfoService) { }

  

  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.apiInfoService.getSeniorCitizensList().subscribe((data) => {
      console.log(data);
      //this.dataSource = data;
    })
  }

}
