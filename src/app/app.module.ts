import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TowerModalPage } from '../pages/tower-modal/tower-modal';
import { ListPage } from '../pages/list/list';
import { AntenaDetailsPage } from '../pages/antena-details/antena-details';
import { Locations } from '../providers/locations';
import { Towers } from '../providers/towers';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { CompassPage } from '../pages/compass/compass';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    AntenaDetailsPage,
    CompassPage,
    TowerModalPage
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
    AntenaDetailsPage,
    CompassPage,
    TowerModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, Towers]
})
export class AppModule {}