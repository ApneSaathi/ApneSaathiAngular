import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

const matVariables=[
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatCheckboxModule
];

@NgModule({
  imports: [matVariables],
  exports:[matVariables]
})
export class MaterialModule { }
