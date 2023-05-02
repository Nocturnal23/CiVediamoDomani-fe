import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginpageComponent } from './layout/loginpage/loginpage.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderBarComponent } from './layout/header-bar/header-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileCardComponent } from './layout/profile-card/profile-card.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { SearchPageComponent } from './layout/search-page/search-page.component';

@NgModule({
    declarations: [
        AppComponent,
        ContainerComponent,
        HelloworldComponent,
        NotFoundComponent,
        LoginpageComponent,
        HomepageComponent,
        HeaderBarComponent,
        ProfileCardComponent,
        SearchPageComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
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
