import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AlbumService} from "./services/album.service";
import { CurrencyPipe } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [AlbumService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
