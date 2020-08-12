import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeniorCitizensComponent } from './senior-citizens.component';

const routes: Routes = [{ path: '', component: SeniorCitizensComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeniorCitizensRoutingModule { }
