import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WordlistComponent} from './wordlist/wordlist.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegFormComponent} from './reg-form/reg-form.component';
import {ActivationService} from './activation.service';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register',  component: RegFormComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full'},
  { path: 'words', component: WordlistComponent, canActivate: [ActivationService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
