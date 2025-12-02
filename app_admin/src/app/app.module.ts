import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripCardComponent } from './trips/trip-card/trip-card.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TripListComponent,
    TripCardComponent,
    TripEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
