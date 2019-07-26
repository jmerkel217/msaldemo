import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { MyriskComponent } from './myrisk/myrisk.component';

const routes: Routes = [
  {path: "userlist", component: UserlistComponent},
  {path: "myrisk", component: MyriskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
