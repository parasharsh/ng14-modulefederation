import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'ui-sdk/button';
import { UiSdkModule } from 'ui-sdk';
import { AppComponent } from './app.component';
import { CardComponent } from 'ui-sdk/card';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiSdkModule, ButtonModule, CardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
