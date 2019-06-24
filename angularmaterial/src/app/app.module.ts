import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatGridListModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { MapComponent } from './components/map/map.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { DriverCardComponent } from './components/driver-card/driver-card.component';
import { RouterModule, Routes } from '@angular/router';
import { ActiveDriversComponent } from './components/active-drivers/active-drivers.component';
import { DriverRegisterComponent } from './components/driver-register/driver-register.component';
import { FindNearestComponent } from './components/find-nearest/find-nearest.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MapComponent,
    DriverCardComponent,
    MapViewComponent,
    ActiveDriversComponent,
    DriverRegisterComponent,
    FindNearestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    StoreDevtoolsModule,
    FormsModule,
    /*StoreModule.forRoot(''),*/
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
