import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeniorCitizensComponent } from './senior-citizens.component';
import { AssignSeniorCitizensComponent } from './assign-senior-citizens/assign-senior-citizens.component';
import { SeniorCitizensListComponent } from './senior-citizens-list/senior-citizens-list.component';

const routes: Routes = [{ path: '', component: SeniorCitizensListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeniorCitizensRoutingModule { }
