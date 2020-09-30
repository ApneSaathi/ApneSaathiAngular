import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ApiInfoService} from 'src/app/services/api-info.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-senior-citizens-detail-view',
  templateUrl: './senior-citizens-detail-view.component.html',
  styleUrls: ['./senior-citizens-detail-view.component.scss']
})
export class SeniorCitizensDetailViewComponent implements OnInit {

  public base_url;
  public srCitizenId: number;
  public grievanceListData;
  public srCitizenDetails;
  public grievanceTrackingData;
  public diabeticData;
  public bpData;
  public lungData;
  public cancerOrSurgeryData;
  public otherAilmentsData;
  public grievanceCreatedDate: Object[];
  public quarantinedstatus;
  public coughData;
  public feverData;
  public breathingData;
  public throatData;

  // owl carousel code here
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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

  constructor(private router:  Router, private route: ActivatedRoute, private apiInfoService: ApiInfoService) {}

  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.srCitizenId = id;
    });
    this.fetchDetails();
  }

  fetchDetails() {
    this.apiInfoService.srCitizenPersonalinfo({id: this.srCitizenId}).subscribe((data) => {
      this.srCitizenDetails = data;

      this.grievanceListData = data.medicalGreivanceList[0];
      console.log(this.grievanceListData);

      this.grievanceTrackingData = data.medicalGreivanceList[0].greivanceTracking;
      console.log(this.grievanceTrackingData);

      this.grievanceCreatedDate = this.grievanceTrackingData.filter(date => date['createdDate']);
      console.log(this.grievanceCreatedDate);

      // this.grievanceTrackingData.filter((date) => {
      //   this.grievanceCreatedDate =  date.createdDate;
      //   console.log(this.grievanceCreatedDate);
      // }) 

      if(this.grievanceListData.diabetic == "Y"){
        this.diabeticData = "Diabetes";
      }
      else{
        this.diabeticData = "";
      }
      if(this.grievanceListData.bloodpressure == "Y"){
        this.bpData = "Blood Pressure";
      }
      else{
        this.bpData = "";
      }
      if(this.grievanceListData.lungailment == "Y"){
        this.lungData = "Lung Ailment";
      }
      else{
        this.lungData = "";
      }
      if(this.grievanceListData.cancer_or_majorsurgery == "Y"){
        this.cancerOrSurgeryData = "Cancer/Major Surgery";
      }
      else{
        this.cancerOrSurgeryData = "";
      }
      if(this.grievanceListData.other_ailments == "Y"){
        this.otherAilmentsData = "Other Ailments";
      }
      else{
        this.otherAilmentsData = "";
      }

      if(this.grievanceListData.quarantinestatus == 0){
        this.quarantinedstatus = "Not quarantine";
      }
      else if(this.grievanceListData.quarantinestatus == 1){
        this.quarantinedstatus = "Home Quarantine";
      }
      else if(this.grievanceListData.quarantinestatus == 2){
        this.quarantinedstatus = "Govt Quarantine";
      }
      else if(this.grievanceListData.quarantinestatus == 3){
        this.quarantinedstatus = "Hospitalized";
      }
      else {
        this.quarantinedstatus = "";
      }

      if(this.grievanceListData.hascough == "Y"){
        this.coughData = "Cough";
      }
      else{
        this.coughData = "";
      }
      if(this.grievanceListData.hasfever == "Y"){
        this.feverData = "Fever";
      }
      else{
        this.feverData = "";
      }
      if(this.grievanceListData.has_shortnes_of_breath == "Y"){
        this.breathingData = "Shortness of breath";
      }
      else{
        this.breathingData = "";
      }
      if(this.grievanceListData.has_sorethroat == "Y"){
        this.throatData = "Sore Throat";
      }
      else{
        this.throatData = "";
      }
      
    })
  }

  gotoSrCitizensList() {
    this.router.navigate(['seniorCitizens/seniorCitizensList',{id: this.srCitizenId}]);
  }

  gotoSrCitizens() {
    this.router.navigate(['/seniorCitizens',{id: this.srCitizenId}]);
  }
}
