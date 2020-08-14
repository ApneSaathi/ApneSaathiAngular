import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'seniorCitizens'
  },
  { 
    path: 'volunteers', 
    loadChildren: () => import('./volunteers/volunteers.module').then(m => m.VolunteersModule)
  }, 
  { path: 'seniorCitizens', 
   loadChildren: () => import('./senior-citizens/senior-citizens.module').then(m => m.SeniorCitizensModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
