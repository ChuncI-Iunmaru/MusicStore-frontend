import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AlbumService} from "./services/album.service";
import {CurrencyPipe} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {SearchComponent} from './components/search/search.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  OKTA_CONFIG, OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent
} from "@okta/okta-angular";

import myAppConfig from './config/my-app-config';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserRecommendationsComponent } from './components/user-recommendations/user-recommendations.component';
import { BestsellerRecommendationsComponent } from './components/bestseller-recommendations/bestseller-recommendations.component';
import {AuthGuardEmployeeService} from "./services/auth-guard-employee.service";
import { CrudPageComponent } from './components/crud-page/crud-page.component';
import { StatsComponent } from './components/stats/stats.component';


const oktaConfig = Object.assign({
  // @ts-ignore
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'crudPage/:id', component: CrudPageComponent, canActivate: [AuthGuardEmployeeService]},
  {path: 'userPage', component: UserPageComponent, canActivate: [OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
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
    RecommendationComponent,
    LoginComponent,
    LoginStatusComponent,
    UserPageComponent,
    UserRecommendationsComponent,
    BestsellerRecommendationsComponent,
    CrudPageComponent,
    StatsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [AlbumService, CurrencyPipe, {provide: OKTA_CONFIG, useValue: oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
