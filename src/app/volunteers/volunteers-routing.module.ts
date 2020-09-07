import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteerDetailViewComponent } from './volunteer-detail-view/volunteer-detail-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'voluntersList'},
  { path: 'voluntersList', component: VolunteersListComponent },
  {path:'VolunteerDetailView', component: VolunteerDetailViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteersRoutingModule { }
