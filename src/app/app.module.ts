import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TowerDetailsPage } from '../pages/tower-details/tower-details';
import { Towers } from '../providers/towers';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { CompassPage } from '../pages/compass/compass';
import { RecommendationsPage } from "../pages/recommendations/recommendations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CompassPage,
    TowerDetailsPage,
    RecommendationsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CompassPage,
    TowerDetailsPage,
    RecommendationsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GoogleMaps, Connectivity, Towers]
})
export class AppModule {}