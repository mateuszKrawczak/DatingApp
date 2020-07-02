import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component'
@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent,RegisterComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
