import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService} from './_services/alert.service';
import { AuthenticationService} from './_services/authentication.service';
import { RegisterService} from './_services/register.service';
import { LoginComponent } from './home/login.component';
import { RegisterComponent } from './home/register.component';
import {WelcomeComponent} from './home/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    RegisterService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
