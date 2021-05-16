import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AlbumService} from "./services/album.service";
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AlbumService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
