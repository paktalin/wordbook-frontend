import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordlistComponent } from './components/wordlist/wordlist.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { WordFieldComponent } from './components/wordlist/word-field/word-field.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TagComponent } from './components/tag/tag.component';
import {AlertComponent} from './components/alert/alert.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import {SearchBarComponent} from './components/wordlist/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    WordlistComponent,
    LoginFormComponent,
    RegFormComponent,
    AlertComponent,
    WordFieldComponent,
    SortingComponent,
    NavbarComponent,
    TagComponent,
    TagsListComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:9090']
      }
    })
  ],
  providers: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
