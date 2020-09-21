import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from 'src/app/notification-message/notification-message.component';

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
  public subs = new SubscriptionsContainer();
  public dialogReference;
  public srCitizensToUnassign:any[];

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
  public loadingSpinner:boolean=true;
  constructor(private route: ActivatedRoute, private router: Router, private apiInfoService: ApiInfoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
    this.loadingSpinner=true;
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
      
      this.percentCompleted = this.countCompleted>0?Math.round((this.countCompleted / this.totalCalls) * 100):0;
      //this.percentPending = this.countPending > 0 ?Math.round((this.countPending / this.totalCalls) * 100):0;
      let tempPercentNeedFollowup = this.countNeedFollowup > 0 ?Math.round((this.countNeedFollowup / this.totalCalls) * 100):0;
      this.percentNeedFollowup = tempPercentNeedFollowup+this.percentCompleted;

    },
    errorResponse=>{
      if(errorResponse.status==409){
        let message="Something went wrong"; 
      }
    },
    ()=>{
      this.loadingSpinner=false;
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
      width: "800px",
      height:"540px",
      autoFocus: false,
    };
    this.openGlobalPopup(configObject);
  }

  opeDdeboardVolunteer(volunteer){
    if(volunteer.count_SrCitizen>0){
      let congigObject ={
        data:{
          heading:"Deboarding Volunteer",
          feature: "deboardingVolunteer",
          volunteerObj: volunteer
        },
        disableClose:true,
        width: "50%",
        autoFocus: false,
        //position:{top:"50px"},
        //height:"500px"
      };
      this.openGlobalPopup(congigObject);
      this.subs.add=this.dialogReference.afterClosed().subscribe(dialogResponse=>{
        if(dialogResponse.deboardType=='transferCitizens'){
          this.openTransferSrCitizens(volunteer,dialogResponse.deboardType);
        }
        else{
          this.unAssignCitizens(volunteer,dialogResponse.deboardType);
        }
      })
    }
    else{
      if(confirm('Do you really want to deboard volunteer?'))
        this.deboardVolunteer(volunteer);
    }
  }

  openTransferSrCitizens(volunteer,deboardType){
    let congigObject ={
      data:{
        heading:"Volunteers list",
        headingSubscript: "below are the volunteers from the same district",
        headingRightContent:"The Volunteer getting De-boarded has "+volunteer.count_SrCitizen +" Sr.citizens assigned",
        feature: "assignSrCitizensEqually",
        volunteerObj: volunteer
      },
      disableClose:true,
      width: "90%",
      autoFocus: false,
      //position:{top:"50px"},
      //height:"500px"
    };
    this.openGlobalPopup(congigObject);
    this.subs.add=this.dialogReference.afterClosed().subscribe(dialogResponse=>{
      console.log("Dialog Response:",dialogResponse);
      if(dialogResponse.transfer){
        let message="Transfer success";
        this.deboardVolunteer(volunteer,deboardType);
      }
      else{
        let message="Transfer of Volunteers failed or cancelled";
        this.showNotification({message,success:false})
      }
    })
  }

  unAssignCitizens(volunteer,deboardType){
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/srCitizenByVolunteer",
      postData:{id: volunteer.idvolunteer}
    };
    this.loadingSpinner=true;
    this.subs.add = this.apiInfoService.dynamicPostRequest(paramsObj).subscribe(response=>{
      console.log(response);
      let message='';
      if(response.message=='Success' && response.statusCode ==0 && typeof response.srCitizenList!='undefined' &&  response.srCitizenList.length > 0 ){
        this.srCitizensToUnassign= response.srCitizenList;
        console.log("Assigned Citizens:",this.srCitizensToUnassign);
        this.invokeUnassignCitizens(volunteer,deboardType,this.srCitizensToUnassign)
      }
      else{
        message="No Senior Citizens found..!";
        this.showNotification({message,success:false});
      }
    },
    errorResponse=>{
      let message='';
      if(errorResponse.status == 409){
        message="No Senior Citizens found..!";
      }
      else{
        message="Something went wrong.!";
      }
      this.showNotification({message,success:false});
      this.srCitizensToUnassign=[];
      this.loadingSpinner=false;
    },
    ()=>{
      this.loadingSpinner=false;
    });
  }

  deboardVolunteer(volunteer,deboardType='noaction'){
    let message='';
    message= volunteer.count_SrCitizen;
    message+=volunteer.count_SrCitizen > 1?' sr.citizens':' sr.citizen';
    if(deboardType=='transferCitizens'){
      
      message+=" of "+volunteer.firstName+" has been transferred to others and deboarded ";
    }
    else{
      message+=" of "+volunteer.firstName+" has been Unassigned and deboarded ";
    }
    message+=volunteer.gender=='M'?'him':'her';
    message+=" successfully.";
    if(deboardType=='noaction'){
      message =volunteer.firstName+" has been deboarded successfully";
    }
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/deboardVolunteer",
      postData:{idvolunteer: volunteer.idvolunteer}
    };
    this.loadingSpinner=true;
    this.subs.add = this.apiInfoService.dynamicPutRequest(paramsObj).subscribe(response=>{
      console.log(response);
      if(response.message=='Success' && response.statusCode ==0){
        this.showNotification({message,success:true});
        //let postData={status:"Active",limit:this.itemsPerPage,pagenumber:0};
        //this.getPaginationData(1);
        //this.getDeboardedPaginationData(1);

      }
      else{
        message="Deboard has been failed but Transfer/Unassigning of sr.citizens has been done";
        this.showNotification({message,success:false});
      }
    },
    errorResponse=>{
      message="Deboard has been failed but Transfer/Unassigning of sr.citizens has been done";
      this.showNotification({message,success:false});
      this.loadingSpinner=false;
    },
    ()=>{
      this.loadingSpinner=false;
    });
  }

  showNotification(notificationData,duration=5000){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:duration,
      panelClass: "notification-snackbar"
    });
  }

  invokeUnassignCitizens(volunteer,deboardType,srCitizensToUnassign){
    let paramsObj={
      url:"http://15.207.42.209:8080/Volunteer/UnassignSrCitizen",
      postData:{
        idvolunteer: volunteer.idvolunteer,
        srCitizenList: srCitizensToUnassign
      }
    };
    this.loadingSpinner=true;
    this.subs.add = this.apiInfoService.dynamicPostRequest(paramsObj).subscribe(response=>{
      console.log(response);
      let message='';
      if(response.message=='Success' && response.statusCode ==0){
        this.deboardVolunteer(volunteer,deboardType)
      }
      else{
        message="Something went wrong.!";
        this.showNotification({message,success:false});
      }
    },
    errorResponse=>{
      let message="Something went wrong.!";
      this.showNotification({message,success:false});
      this.loadingSpinner=false;
    },()=>{
      this.loadingSpinner=false;
    });
  }
  
}
