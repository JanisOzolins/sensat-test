import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DashboardContainer } from './containers/dashboard/dashboard.container';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DashboardContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
