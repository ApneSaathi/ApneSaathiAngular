import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { A11yModule } from '@angular/cdk/a11y';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';

const matVariables=[
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatCheckboxModule,
  MatListModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    A11yModule,
    CdkTableModule,
    MatCardModule,
    // MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    // MatPaginatorModule,
    MatRippleModule,
    // MatSelectModule,
    // MatSortModule,
    MatTableModule,
    // MatTooltipModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatTabsModule,
    MatInputModule
];

@NgModule({
  imports: [matVariables],
  exports:[matVariables]
})
export class MaterialModule { }
