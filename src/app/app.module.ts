import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BodyComponent } from './Components/body/body.component';
import { FormComponent } from './Components/form/form.component';
import { TableComponent } from './Components/table/table.component';
import { EditComponent } from './Components/edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

const appRoutes:Routes=[
  {path:'', component:FormComponent, canActivate:[AuthGuard]},
  {path:'table', component:TableComponent, canActivate:[AuthGuard]},
  {path:'edit', component:EditComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
]

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
    BodyComponent,
    TableComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    BrowserAnimationsModule,
    TooltipModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['/login', '/register'],
        disallowedRoutes: ['', '/table', '/edit'],
      },
    }),
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
