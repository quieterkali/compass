import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Locations } from '../../providers/locations';
import { AntenaDetailsPage } from '../antena-details/antena-details';
import { GoogleMaps } from '../../providers/google-maps';
declare const google;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  towers: any [];
 
  constructor(private navCtrl: NavController, 
              private locations: Locations, 
              private maps: GoogleMaps,
              private loadingCtrl: LoadingController) {}

  presentationLoading(){
    let loader = this.loadingCtrl.create({
        content: "Carregando",
        spinner: 'dots'
    });

    loader.present().then(() => {
      this.locations.getTowers().then(data => {
        this.towers = data;
        loader.dismiss();
      });
    })
  }
 
  ionViewDidLoad() {
    this.presentationLoading();
  }

  getDistance(){
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.maps.evaluateDistance(latLng);
    })
  }

  goToAntenaDetailsPage(location){
    this.navCtrl.parent.parent.push(AntenaDetailsPage, {location: location});
  }
}