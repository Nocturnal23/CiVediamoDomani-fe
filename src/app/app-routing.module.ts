import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginpageComponent} from "./layout/loginpage/loginpage.component";

const routes: Routes = [
  { path: 'helloworld', component: HelloworldComponent },
  { path: 'login', component:LoginpageComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
