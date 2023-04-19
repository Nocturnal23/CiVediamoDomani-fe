import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginpageComponent} from "./layout/loginpage/loginpage.component";
import {ContainerComponent} from "./layout/container/container.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  { path: 'not_found', component: NotFoundComponent },
  { path: 'login', component:LoginpageComponent },
  { path: '', component: ContainerComponent, children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'helloworld', component: HelloworldComponent },
      { path: '**', redirectTo: 'not_found', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
