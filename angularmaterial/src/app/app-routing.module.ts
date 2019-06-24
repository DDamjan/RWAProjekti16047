import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapViewComponent } from './components/map-view/map-view.component';
import { ActiveDriversComponent } from './components/active-drivers/active-drivers.component';
import { DriverRegisterComponent } from './components/driver-register/driver-register.component';
import { FindNearestComponent } from './components/find-nearest/find-nearest.component';

const routes: Routes = [
  { path: '', component: ActiveDriversComponent },
  { path: 'view-map', component: MapViewComponent },
  { path: 'register', component: DriverRegisterComponent },
  { path: 'find', component: FindNearestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
