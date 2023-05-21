import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginPageComponent} from "./pages/loginpage/login-page.component";
import {ContainerComponent} from "./layout/container/container.component";
import {HomePageComponent} from "./pages/homepage/home-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {ProfileCardComponent} from "./layout/profile-card/profile-card.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";

const routes: Routes = [
    { path: 'not_found', component: NotFoundComponent },
    { path: 'login', component:LoginPageComponent },
    //TODO: Spostare profile e login sotto?
    { path: 'profile', component:ProfilePageComponent },
    { path: 'settings', component:SettingsPageComponent },
    { path: 'testcard', component: ProfileCardComponent},
    { path: '', component: ContainerComponent, children: [
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
