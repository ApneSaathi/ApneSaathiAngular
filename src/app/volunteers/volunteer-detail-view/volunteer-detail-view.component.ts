import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ApiInfoService} from 'src/app/services/api-info.service';

@Component({
  selector: 'app-volunteer-detail-view',
  templateUrl: './volunteer-detail-view.component.html',
  styleUrls: ['./volunteer-detail-view.component.scss']
})
export class VolunteerDetailViewComponent implements OnInit {

  public volunteerId;
  public base_url;
  volunteerDetailsDataSource;

  constructor(private route: ActivatedRoute, private router: Router, private apiInfoService: ApiInfoService) { }

  ngOnInit(): void {

    this.base_url=environment.base_url;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.volunteerId = id;
    });

    this.apiInfoService.getVolunteerDetails({id: this.volunteerId}).subscribe((data) => {
      this.volunteerDetailsDataSource = data.volunteer;
    })
    
  }

  gotoVolunteerList() {
    this.router.navigate(['volunteers/voluntersList',{id: this.volunteerId}]);
  }
}
