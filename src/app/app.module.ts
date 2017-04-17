import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ColorPickerService, ColorPickerDirective } from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { NgLoaded } from '../directives/ng.loaded'


@NgModule({
  declarations: [
    AppComponent,
    NgLoaded,
    ColorPickerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  exports: [ColorPickerDirective],
  providers: [ColorPickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
