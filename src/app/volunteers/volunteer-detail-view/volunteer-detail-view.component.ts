import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  public ratingsDataSource: object[];
  public volunteerCallListDataSource: object[];
  public totalCalls;
  public percentCompleted;
  public percentPending;
  public percentNeedFollowup;
  public statusCompleted;
  public statusPending;
  public statusNeedFollowup;
  public countCompleted;
  public countPending;
  public countNeedFollowup;

  // owl carousel code here
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ["<span class='material-icons'>navigate_before</span>", "<span class='material-icons'>navigate_next</span>"],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  constructor(private route: ActivatedRoute, private router: Router, private apiInfoService: ApiInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.volunteerId = id;
    });
    this.fetchDetails();
    //this.fetchVolunteersList();
    //this.callStatus();
    //this.totalCallsClass();
  }
  
  getFullStarsArray(volunteer){
    let reviewsArray=[];
    if(Math.floor(volunteer.rating) > 0){
      let arraySize= Math.floor(volunteer.rating);
      let isHalfStar=false;
      let planeStars=arraySize >=5?0:(5-arraySize);
      if((volunteer.rating%1) >= 8){
        arraySize+=1;
      }
      else{
        isHalfStar=true;
        planeStars-=1;
      }
      for (let index = 1; index <= arraySize; index++) {
        let temp_obj={starType:'star',startColor:arraySize>=3?'rating-icon-yellow':'rating-icon-red'};
        reviewsArray.push(temp_obj);
      }
      if(isHalfStar){
        let temp_obj={starType:'star_half',startColor:arraySize>=3?'rating-icon-yellow':'rating-icon-red'};
          reviewsArray.push(temp_obj);
      }
      if(planeStars > 0){
        for (let index = 1; index <= planeStars; index++) {
          let temp_obj={starType:'star_outline',startColor:''};
          reviewsArray.push(temp_obj);
        }
      }
    }
    else{
      for (let index = 1; index <= 5; index++) {
        let temp_obj={starType:'star_outline',startColor:''};
        reviewsArray.push(temp_obj);
      }
    }
    return reviewsArray;
  }
  fetchDetails() {
    this.apiInfoService.getVolunteerDetails({id: this.volunteerId}).subscribe((data) => {

      this.volunteerDetailsDataSource = data.volunteerVO;
      this.assignedCitizensDataSource = data.volunteerVO.srCitizenList;
      this.ratingsDataSource = data.volunteerVO.volunteerRatingList;
      this.volunteerCallListDataSource = data.volunteerVO.volunteercallList;

      this.totalCalls = this.volunteerCallListDataSource.length;
      console.log(this.totalCalls);
      this.statusCompleted = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] == 10);
      console.log(this.statusCompleted);
      this.statusPending = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] == 1);
      console.log(this.statusPending);
      this.statusNeedFollowup = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] != 10 && status['callstatusCode'] != 1);
      console.log(this.statusNeedFollowup);

      this.countCompleted = this.statusCompleted.length;
      this.countPending = this.statusPending.length;
      this.countNeedFollowup = this.statusNeedFollowup.length;
    
      this.percentCompleted = Math.round((this.countCompleted / this.totalCalls) * 100);
      this.percentPending = Math.round((this.countPending / this.totalCalls) * 100);
      this.percentNeedFollowup = Math.round((this.countNeedFollowup / this.totalCalls) * 100);

    })
  }

  // callStatus() {
  //   this.statusCompleted = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] == 10);
  //   console.log(this.statusCompleted);
  //   let statusPending = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] == 1);
  //   let statusNeedFollowup = this.volunteerCallListDataSource.filter(status => status['callstatusCode'] != 10 && status['callstatusCode'] != 1);
    
  //   let countCompleted = this.statusCompleted.length;
  //   let countPending = statusPending.length;
  //   let countNeedFollowup = statusNeedFollowup.length;
    
  //   this.percentCompleted = Math.round((countCompleted / this.totalCalls) * 100);
  //   this.percentPending = Math.round((countPending / this.totalCalls) * 100);
  //   this.percentNeedFollowup = Math.round((countNeedFollowup / this.totalCalls) * 100);
  // }

  // fetchVolunteersList() {
  //   this.apiInfoService.postVolunteersList({"status": "Active"}).subscribe((data) => {
  //     this.volunteersListDataSource = data.volunteers;
  //     console.log(this.volunteersListDataSource);
  //   })
  // }

  //  totalCallsClass() {
  //    this.totalCalls = this.volunteerCallListDataSource.length;
  //    console.log(this.totalCalls);
  //  }

  volunteerRating(){
    return {
      'rating-icon-red': this.volunteerDetailsDataSource.rating > 0 && this.volunteerDetailsDataSource.rating <= 3,
      'rating-icon-yellow': this.volunteerDetailsDataSource.rating > 0  && this.volunteerDetailsDataSource.rating > 3
    }
  }

  gotoVolunteerList() {
    this.router.navigate(['volunteers/voluntersList',{id: this.volunteerId}]);
  }

  gotoVolunteers() {
    this.router.navigate(['/volunteers',{id: this.volunteerId}]);
  }

  openGlobalPopup(configurationObject){
    const dialogRef = this.dialog.open(GlobalDialogComponent,configurationObject);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchDetails();
      //this.fetchVolunteersList();
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

  transferVolunteer(volunteer) {
    let configObject ={
      data:{
        heading:"Transfer Location of Volunteer",
        feature: "transferVolunteer",
        volunteerObj: volunteer
      },
      disableClose:true,
      width: "60%",
      height:"60%",
      autoFocus: false,
    };
    this.openGlobalPopup(configObject);
  }
  
}
