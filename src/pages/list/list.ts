import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
 
  constructor(private navCtrl: NavController, private locations: Locations, private maps: GoogleMaps) {
    console.log(this.locations.data);
  }
 
  ionViewDidLoad() {
    console.log('Hello ListPage Page');
    this.getDistance();
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