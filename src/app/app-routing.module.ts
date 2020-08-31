import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectGuard } from './protect.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'volunteers'
  },
  {
    path: 'login', component: LoginComponent
  },
  { 
    path: 'volunteers', 
    loadChildren: () => import('./volunteers/volunteers.module').then(m => m.VolunteersModule),
    canActivate: [ProtectGuard]
  }, 
  { path: 'seniorCitizens', 
   loadChildren: () => import('./senior-citizens/senior-citizens.module').then(m => m.SeniorCitizensModule),
   canActivate: [ProtectGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
