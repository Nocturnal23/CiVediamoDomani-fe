import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginPageComponent} from "./pages/loginpage/login-page.component";
import {HeaderContainerComponent} from "./layout/container/header-container.component";
import {HomePageComponent} from "./pages/homepage/home-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {LeftMenuComponent} from "./layout/left-menu/left-menu.component";
import {EventPageComponent} from "./pages/event-page/event-page.component";
import {InfoEventComponent} from "./pages/info-event/info-event.component";
import {categoryResolver, eventResolver, searchResolver, usersResolver} from "./core/resolvers/Resolvers";
import {canLogin, isAdmin, isLoggedUser} from "./core/guards/UserGuard"
import {EditEventComponent} from "./pages/edit-event/edit-event.component";
import {DashboardUserComponent} from "./pages/dashboard-user/dashboard-user.component";
import {DashboardEventComponent} from "./pages/dashboard-event/dashboard-event.component";
import {LeftMenuDashboardComponent} from "./layout/left-menu-dashboard/left-menu-dashboard.component";
import {RoutingEnums} from "./core/utils/Enums";
import {DashboardCategoriesComponent} from "./pages/dashboard-categories/dashboard-categories.component";
import {InfoCategoryComponent} from "./pages/info-category/info-category.component";

const routes: Routes = [
    { path: 'not_found', component: NotFoundComponent},
    { path: RoutingEnums.LOGIN, component:LoginPageComponent,
        canActivate: [canLogin]},

    { path: RoutingEnums.USER, component: LeftMenuComponent,
        canActivate: [isLoggedUser], children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' }, // TODO Da rivedere
            { path: `${RoutingEnums.PROFILE}/:url`, component:ProfilePageComponent },
            { path: RoutingEnums.SETTINGS, component:SettingsPageComponent},
            { path: RoutingEnums.EVENTS, component:EventPageComponent },
        ]
    },

    { path: RoutingEnums.DASHBOARD, component: LeftMenuDashboardComponent,
        canActivate: [isAdmin], children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: DashboardUserComponent,
                resolve: {userList: usersResolver}
            },
            {path: 'userinfo/:url', component: ProfilePageComponent},

            { path: 'events', component: DashboardEventComponent,
                resolve: {eventDashList: eventResolver}
            },
            {path: 'eventinfo/:url', component: InfoEventComponent},

            {path: 'category', component: DashboardCategoriesComponent,
                resolve:  {categoryDashList: categoryResolver}},
            {path: 'categoryinfo/:url', component: InfoCategoryComponent}
        ]},

    { path: '', component: HeaderContainerComponent, children: [
            { path: 'helloworld', component: HelloworldComponent },
            { path: RoutingEnums.HOMEPAGE, component: HomePageComponent },
            { path: 'search', component: SearchPageComponent,
                runGuardsAndResolvers: "always",
                resolve: { eventList: searchResolver }
            },
            { path: 'infoevent/:url', component: InfoEventComponent },
            { path: 'editevent', component: EditEventComponent },
            { path: '**', redirectTo: `/${RoutingEnums.HOMEPAGE}`, pathMatch: 'full' }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
