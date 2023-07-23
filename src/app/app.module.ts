import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './core/header/header.component';
import { ModalHostDirective } from './core/modal-container/modal-host.directive';
import { ModalContainerComponent } from './core/modal-container/modal-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalHostDirective,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
