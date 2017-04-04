import { Component, ElementRef, ViewChild } from '@angular/core';
import { Towers } from '../../providers/towers';
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
    segment: string = "map";
    mapBool: Boolean = false;
    listBool: Boolean = true;
 
    constructor(private navCtrl: NavController, 
                private maps: GoogleMaps, private platform: Platform, 
                private towersProvider: Towers,
                private loadingCtrl: LoadingController) {
        
    }

    switchMap(){
      this.listBool = true;
      this.mapBool = false;
      console.log(this.listBool)
      console.log(this.mapBool)
    }
    switchList(){
      this.listBool = false;
      this.mapBool = true;
      console.log(this.listBool)
      console.log(this.mapBool)
    }

    mapLoading(){
      let loader = this.loadingCtrl.create({
        content: "Carregando",
        spinner: 'dots'
      });

      loader.present().then(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let towersLoaded = this.towersProvider.getTowers();

        Promise.all([
            mapLoaded,
            towersLoaded
        ]).then((result) => {
            this.towers = result[1];
            this.maps.addMarkersToMap(this.towers);
            loader.dismiss();
        });
      })
    }

    ionViewDidLoad(){
      this.platform.ready().then(() => {
        this.mapLoading();
      });
    }
}