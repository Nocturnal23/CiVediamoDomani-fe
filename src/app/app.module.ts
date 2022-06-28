import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HelloworldComponent } from './helloworld/helloworld.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HelloworldComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
