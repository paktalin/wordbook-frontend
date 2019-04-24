import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WordlistComponent} from './wordlist/wordlist.component';
import {LoginFormComponent} from './login-form/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full'},
  { path: 'words', component: WordlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
