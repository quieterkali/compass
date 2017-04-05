import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { Towers } from '../../providers/towers';
import { GoogleMaps } from '../../providers/google-maps';
import { TowerDetailsPage } from '../tower-details/tower-details';
 
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
    lat: any;
    lng: any;
    formattedAddress:any;
 
    constructor(private navCtrl: NavController, 
                private maps: GoogleMaps, private platform: Platform, 
                private towersProvider: Towers,
                private loadingCtrl: LoadingController) {
        
    }

    // getCurrentLocationFormattedAddress(): Promise<any>{
    //   return new Promise(resolve => {
    //     Geolocation.getCurrentPosition().then(position => {
    //       this.lat = position.coords.latitude;
    //       this.lng = position.coords.longitude;
    //       //console.log(this.lat, this.lng)
    //       // this.maps.getFormattedAddress(this.lat, this.lng);
    //     });
    //   });
    // }

    switchMap(){
      this.listBool = true;
      this.mapBool = false;
    }
    switchList(){
      this.listBool = false;
      this.mapBool = true;
    }

    mapLoading(){
      let loader = this.loadingCtrl.create({
        content: "Carregando",
        spinner: 'dots'
      });

      loader.present().then(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let towersLoaded = this.towersProvider.getTowers();
        let formattedAddress = this.maps.getFormattedAddress();

        Promise.all([
            mapLoaded,
            towersLoaded,
            formattedAddress
        ]).then((result) => {
            this.towers = result[1];
            let formattedAddress = result[2].results[0].address_components;
            this.formattedAddress = formattedAddress[1].long_name + " " + formattedAddress[0].long_name;
            this.maps.addMarkersToMap(this.towers);
            loader.dismiss();
        });
      })
    }

    goToTowerDetailsPage(tower){
      console.log(tower)
      this.navCtrl.push(TowerDetailsPage, {tower: tower})
    }

    ionViewDidLoad(){
      this.platform.ready().then(() => {
        this.mapLoading();
      });
    }
}