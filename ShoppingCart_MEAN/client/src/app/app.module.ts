import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderRoutingModule } from './component/header/header-routing.module';
import { SignUpComponent } from './component/header/sign-up/sign-up.component';
import { SignInComponent } from './component/header/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { FlashMessagesModule } from "angular2-flash-messages";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    SignUpComponent,
    SignInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
