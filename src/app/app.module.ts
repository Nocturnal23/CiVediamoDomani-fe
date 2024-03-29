import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderContainerComponent } from './layout/container/header-container.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginPageComponent } from './pages/loginpage/login-page.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import { HomePageComponent } from './pages/homepage/home-page.component';
import { HeaderBarComponent } from './layout/header-bar/header-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileCardComponent } from './layout/profile-card/profile-card.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from '@angular/material/slider';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { EventPageComponent } from './pages/event-page/event-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import { InfoEventComponent } from './pages/info-event/info-event.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { DashboardEventComponent } from './pages/dashboard-event/dashboard-event.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTreeModule} from "@angular/material/tree";
import {TableComponent, TableRowActionsDirective} from './layout/table';
import {MatSortModule} from "@angular/material/sort";
import {ExtractNestedPropertyPipe} from "./core/commons/pipes/extract-nested-property";
import {MatButtonModule} from "@angular/material/button";
import { LeftMenuDashboardComponent } from './layout/left-menu-dashboard/left-menu-dashboard.component';
import { EventCardComponent } from './layout/event-card/event-card.component';
import {NgOptimizedImage} from "@angular/common";
import { DashboardCategoriesComponent } from './pages/dashboard-categories/dashboard-categories.component';
import { InfoCategoryComponent } from './pages/info-category/info-category.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogAddCategoryComponent } from './layout/dialog-add-category/dialog-add-category.component';
import {MatSelectModule} from "@angular/material/select";
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
import {ShareIconsModule} from "ngx-sharebuttons/icons";
import { DummyComponent } from './layout/dummy/dummy.component';

export const MATERIAL_MODULES = [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatTreeModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderContainerComponent,
        NotFoundComponent,
        LoginPageComponent,
        HomePageComponent,
        HeaderBarComponent,
        ProfileCardComponent,
        SearchPageComponent,
        ProfilePageComponent,
        SettingsPageComponent,
        LeftMenuComponent,
        EventPageComponent,
        InfoEventComponent,
        EditEventComponent,
        DashboardUserComponent,
        DashboardEventComponent,
        TableComponent,
        TableRowActionsDirective,
        ExtractNestedPropertyPipe,
        LeftMenuDashboardComponent,
        EventCardComponent,
        DashboardCategoriesComponent,
        InfoCategoryComponent,
        DialogAddCategoryComponent,
        DummyComponent
    ],
    imports: [
        ...MATERIAL_MODULES,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgOptimizedImage,
        ShareButtonsModule,
        ShareIconsModule
    ],
    providers: [
        { provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '672828380043-ls8399lk3opou7ajkduou2ntuij5r8cb.apps.googleusercontent.com'
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

export class AppModule {}
