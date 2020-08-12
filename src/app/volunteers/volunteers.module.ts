import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';


@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent],
  imports: [
    CommonModule,
    VolunteersRoutingModule
  ]
})
export class VolunteersModule { }
