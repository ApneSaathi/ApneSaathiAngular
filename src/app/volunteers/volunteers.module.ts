import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { VolunteerDetailViewComponent } from './volunteer-detail-view/volunteer-detail-view.component';
import { AddVolunteersComponent } from './add-volunteers/add-volunteers.component';
import { TransferVolunteerComponent } from './transfer-volunteer/transfer-volunteer.component';


@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent, VolunteerDetailViewComponent, AddVolunteersComponent, TransferVolunteerComponent],

  imports: [
    CommonModule,
    VolunteersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  exports:[AddVolunteersComponent,TransferVolunteerComponent]
})
export class VolunteersModule { }
