import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {MyNavComponent} from '../my-nav/my-nav.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    LayoutComponent, HeaderComponent, FooterComponent, MyNavComponent,
    /*MyTableComponent,
    SearchDataverseComponent,*/
    /*MatSpinner,*/
    /* MockApiComponent,*/
    /*SafePipe*/
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    /*MatTableModule,*/
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    /*MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule*/
  ],
  exports: [LayoutComponent, MatIconModule, MatMenuModule/*, MatTableModule*/],
  providers: []
})
export class UiModule {
}
