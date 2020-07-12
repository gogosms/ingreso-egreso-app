import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '', component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutesModule { }
