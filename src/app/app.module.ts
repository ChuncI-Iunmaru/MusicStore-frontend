import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AlbumService} from "./services/album.service";
import {CurrencyPipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from './components/search/search.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecommendationComponent } from './components/recommendation/recommendation.component';

const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    RecommendationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AlbumService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
