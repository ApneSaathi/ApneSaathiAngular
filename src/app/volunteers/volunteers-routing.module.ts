import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteerDetailViewComponent } from './volunteer-detail-view/volunteer-detail-view.component';
import { ImportLogComponent } from './import-log/import-log.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'voluntersList'},
  { path: 'voluntersList', component: VolunteersListComponent },
  {path:'VolunteerDetailView', component: VolunteerDetailViewComponent},
  { path: 'ImportLog', component: ImportLogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteersRoutingModule { }
