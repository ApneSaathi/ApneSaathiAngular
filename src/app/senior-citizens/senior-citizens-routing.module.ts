import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeniorCitizensComponent } from './senior-citizens.component';
import { AssignSeniorCitizensComponent } from './assign-senior-citizens/assign-senior-citizens.component';
import { SeniorCitizensListComponent } from './senior-citizens-list/senior-citizens-list.component';
import { SeniorCitizensDetailViewComponent } from './senior-citizens-detail-view/senior-citizens-detail-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seniorCitizensList'},
  { path: 'seniorCitizensList', component: SeniorCitizensListComponent },
  { path: 'seniorCitizenDetailView', component: SeniorCitizensDetailViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeniorCitizensRoutingModule { }
