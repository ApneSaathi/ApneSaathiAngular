import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class VolunteersModule { }
