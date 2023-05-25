import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginPageComponent} from "./pages/loginpage/login-page.component";
import {HeaderContainerComponent} from "./layout/container/header-container.component";
import {HomePageComponent} from "./pages/homepage/home-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {ProfileCardComponent} from "./layout/profile-card/profile-card.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {TreeListComponent} from "./layout/tree-list/tree-list.component";
import {LeftMenuComponent} from "./layout/left-menu/left-menu.component";

const routes: Routes = [
    { path: 'not_found', component: NotFoundComponent },
    { path: 'login', component:LoginPageComponent },
    { path: 'test', component: TreeListComponent},

    { path: 'user', component: LeftMenuComponent, children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component:ProfilePageComponent },
            { path: 'settings', component:SettingsPageComponent }
        ]
    },

    { path: '', component: HeaderContainerComponent, children: [
            { path: 'helloworld', component: HelloworldComponent },
            { path: 'homepage', component: HomePageComponent },
            { path: 'search/:query', component: SearchPageComponent  },
            { path: '**', redirectTo: '/homepage', pathMatch: 'full' }
        ]
    },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
