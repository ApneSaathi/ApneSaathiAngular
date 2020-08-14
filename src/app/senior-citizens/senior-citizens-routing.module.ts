import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeniorCitizensComponent } from './senior-citizens.component';
import { AssignSeniorCitizensComponent } from './assign-senior-citizens/assign-senior-citizens.component';

const routes: Routes = [{ path: '', component: AssignSeniorCitizensComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeniorCitizensRoutingModule { }
