import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-volunteer-detail-view',
  templateUrl: './volunteer-detail-view.component.html',
  styleUrls: ['./volunteer-detail-view.component.scss']
})
export class VolunteerDetailViewComponent implements OnInit {

  public volunteerId;
  public base_url;
  public volunteerDetailsDataSource;
  public assignedCitizensDataSource: object[];

  constructor(private route: ActivatedRoute, private router: Router, private apiInfoService: ApiInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.base_url=environment.base_url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.volunteerId = id;
    });
    this.fetchDetails();

  }

  fetchDetails() {
    this.apiInfoService.getVolunteerDetails({id: this.volunteerId}).subscribe((data) => {
      this.volunteerDetailsDataSource = data.volunteerVO;
      this.assignedCitizensDataSource = data.volunteerVO.srCitizenList;
    })
  }

  gotoVolunteerList() {
    this.router.navigate(['volunteers/voluntersList',{id: this.volunteerId}]);
  }

  openGlobalPopup(configurationObject){
    const dialogRef = this.dialog.open(GlobalDialogComponent,configurationObject);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchDetails();
    });
  }

  opensrCitizenAssign(volunteer){
    let configObject ={
      data:{
        heading:"Assign Sr.citizens",
        feature: "assignCitizensSingleVolunteer",
        volunteerObj: volunteer
      },
      disableClose:true,
      width: "70%",
      autoFocus: false,
    };
    this.openGlobalPopup(configObject);
  }
  
}
