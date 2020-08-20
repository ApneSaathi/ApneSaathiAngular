import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeniorCitizensRoutingModule } from './senior-citizens-routing.module';
import { SeniorCitizensComponent } from './senior-citizens.component';
import { SeniorCitizensListComponent } from './senior-citizens-list/senior-citizens-list.component';
import { AssignSeniorCitizensComponent } from './assign-senior-citizens/assign-senior-citizens.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SeniorCitizensComponent, SeniorCitizensListComponent, AssignSeniorCitizensComponent],
  imports: [
    CommonModule,
    SeniorCitizensRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    AssignSeniorCitizensComponent
  ]
})
export class SeniorCitizensModule { }
