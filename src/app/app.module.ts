import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { GlobalDialogComponent } from './global-dialog/global-dialog.component';
import { SeniorCitizensModule } from './senior-citizens/senior-citizens.module';
import { ApiInterceptor } from './services/api.interceptor';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectGuard } from "./protect.guard";
import { VolunteersModule } from './volunteers/volunteers.module';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { TransferVolunteerComponent } from './volunteers/transfer-volunteer/transfer-volunteer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    GlobalDialogComponent,
    NotificationMessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SeniorCitizensModule,
    ReactiveFormsModule,
    VolunteersModule
  ],
  entryComponents:[GlobalDialogComponent, NotificationMessageComponent,TransferVolunteerComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    ProtectGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
