import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { AntenaDetailsPage } from '../pages/antena-details/antena-details';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    AntenaDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    AntenaDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity]
})
export class AppModule {}