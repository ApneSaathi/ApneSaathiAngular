import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { VolunteerDetailViewComponent } from './volunteer-detail-view/volunteer-detail-view.component';
import { AddVolunteersComponent } from './add-volunteers/add-volunteers.component';
import { TransferVolunteerComponent } from './transfer-volunteer/transfer-volunteer.component';
import { DeBoardVolunteerComponent } from './de-board-volunteer/de-board-volunteer.component';
import { AssignVolunteersComponent } from './assign-volunteers/assign-volunteers.component';
import { ImportLogComponent } from './import-log/import-log.component';


@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent, VolunteerDetailViewComponent, AddVolunteersComponent, TransferVolunteerComponent, DeBoardVolunteerComponent, AssignVolunteersComponent, ImportLogComponent],

  imports: [
    CommonModule,
    CarouselModule,
    VolunteersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  exports:[AddVolunteersComponent,TransferVolunteerComponent,DeBoardVolunteerComponent,AssignVolunteersComponent]
})
export class VolunteersModule { }
