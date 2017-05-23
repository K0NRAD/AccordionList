import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccordionService } from "../providers/accordion-service";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AccordionListComponent } from '../components/accordion-list/accordion-list';

@NgModule({
  declarations: [
    MyApp,
    AccordionListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccordionService
  ]
})
export class AppModule { }
