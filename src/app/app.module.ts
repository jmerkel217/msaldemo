import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MessagesComponent } from './messages/messages.component';
import { NavigationComponent } from './navigation/navigation.component';
import {MsalModule, MsalInterceptor} from '@azure/msal-angular';
import { UserlistComponent } from './userlist/userlist.component';
import { MyriskComponent } from './myrisk/myrisk.component';

import { MSALDemoCfg } from './Msaldemocfg';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NavigationComponent,
    UserlistComponent,
    MyriskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MsalModule.forRoot(MSALDemoCfg)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
