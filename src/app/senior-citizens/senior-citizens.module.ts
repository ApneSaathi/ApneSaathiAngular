import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { SeniorCitizensRoutingModule } from './senior-citizens-routing.module';
import { SeniorCitizensComponent } from './senior-citizens.component';
import { SeniorCitizensListComponent } from './senior-citizens-list/senior-citizens-list.component';
import { AssignSeniorCitizensComponent } from './assign-senior-citizens/assign-senior-citizens.component';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { SeniorCitizensDetailViewComponent } from './senior-citizens-detail-view/senior-citizens-detail-view.component';


@NgModule({
  declarations: [SeniorCitizensComponent, SeniorCitizensListComponent, AssignSeniorCitizensComponent, SeniorCitizensDetailViewComponent],
  imports: [
    CommonModule,
    SeniorCitizensRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule
  ],
  exports:[
    AssignSeniorCitizensComponent
  ]
})
export class SeniorCitizensModule { }
