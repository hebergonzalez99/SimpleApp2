import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BodyComponent } from './Components/body/body.component';
import { FormComponent } from './Components/form/form.component';
import { TableComponent } from './Components/table/table.component';
import { EditComponent } from './Components/edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

const appRoutes:Routes=[
  {path:'', component:FormComponent},
  {path:'table', component:TableComponent},
  {path:'edit', component:EditComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
    BodyComponent,
    TableComponent,
    EditComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
