import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform, LoadingController } from 'ionic-angular';

import { ListPage } from '../list/list';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    towers: any [];
 
    constructor(private navCtrl: NavController, 
                private maps: GoogleMaps, private platform: Platform, 
                private locations: Locations,
                private loadingCtrl: LoadingController) {
        
    }

    presentationLoading(){

      let loader = this.loadingCtrl.create({
        content: "Carregando",
        spinner: 'dots'
      });

      loader.present().then(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let locationsLoaded = this.locations.getTowers();

        Promise.all([
            mapLoaded,
            locationsLoaded
        ]).then((result) => {
            this.towers = result[1];
            let locations = result[1];
            this.maps.addMarkersToMap(locations);
            loader.dismiss();
        });
      })
  }

    ionViewDidLoad(){


        //this.maps.evaluateDistance();
 
        this.platform.ready().then(() => {
          this.presentationLoading();
        });
    }

    goToList(){
        this.navCtrl.push(ListPage);
    }
 
}