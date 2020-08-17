import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';

const routes: Routes = [{ path: '', component: VolunteersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteersRoutingModule { }
