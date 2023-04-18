import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './layout/login/login.component';
import { LogintestComponent } from './layout/logintest/logintest.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";

@NgModule({
    declarations: [
        AppComponent,
        ContainerComponent,
        HelloworldComponent,
        NotFoundComponent,
        LoginComponent,
        LogintestComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        GoogleSigninButtonModule
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: false,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        'clientId'
                    )
                }
            ],
            onError: (err) => {
                console.error(err);
            }
        } as SocialAuthServiceConfig,
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
