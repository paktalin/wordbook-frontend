import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WordlistComponent} from './components/wordlist/wordlist.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegFormComponent} from './components/reg-form/reg-form.component';
import {ActivationService} from './services/activation.service';

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
