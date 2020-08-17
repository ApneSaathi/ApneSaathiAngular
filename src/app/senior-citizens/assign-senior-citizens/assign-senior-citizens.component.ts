import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-senior-citizens',
  templateUrl: './assign-senior-citizens.component.html',
  styleUrls: ['./assign-senior-citizens.component.scss']
})
export class AssignSeniorCitizensComponent implements OnInit {

  constructor() { }
  public tempCitizensNumber:object[];
  ngOnInit(): void {
    this.tempCitizensNumber=[
      {id:1,name:"Citizen1",phone:1234567890},
      {id:2,name:"Citizen2",phone:1234567890},
      {id:3,name:"Citizen3",phone:1234567890},
      {id:4,name:"Citizen4",phone:1234567890},
      {id:5,name:"Citizen5",phone:1234567890},
      {id:6,name:"Citizen6",phone:1234567890},
      {id:7,name:"Citizen7",phone:1234567890},
      {id:8,name:"Citizen8",phone:1234567890},
      {id:9,name:"Citizen9",phone:1234567890},
      {id:10,name:"Citizen10",phone:1234567890},
      {id:11,name:"Citizen11",phone:1234567890},
      {id:12,name:"Citizen12",phone:1234567890},
      {id:13,name:"Citizen13",phone:1234567890},
      {id:14,name:"Citizen14",phone:1234567890},
      {id:15,name:"Citizen15",phone:1234567890},
    ];
  }

}
