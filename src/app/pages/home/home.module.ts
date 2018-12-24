import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {MyDashboardComponent} from '../../my-dashboard/my-dashboard.component';
import {
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent, MyDashboardComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
