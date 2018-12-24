import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatIconRegistry,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {UiModule} from './ui/ui.module';
import {RechercheRatpModule} from './pages/recherche-ratp/recherche-ratp.module';
import {ApiService} from './services/api/api.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    RechercheRatpModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ApiService, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
