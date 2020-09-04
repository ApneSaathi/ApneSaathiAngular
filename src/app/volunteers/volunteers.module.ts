import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddVolunteersComponent } from './add-volunteers/add-volunteers.component';
@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent, AddVolunteersComponent],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  exports:[AddVolunteersComponent]
})
export class VolunteersModule { }
