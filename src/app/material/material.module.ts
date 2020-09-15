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
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
const matVariables=[
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatCheckboxModule,
    
    A11yModule,
    CdkTableModule,
    // MatButtonModule,
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
    MatInputModule,
    MatDialogModule,
    MatButtonModule,

    MatSelectModule,
    MatSortModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,

    MatGridListModule,
    MatRadioModule
];

@NgModule({
  imports: [matVariables],
  exports:[matVariables]
})
export class MaterialModule { }
