import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompassPage } from '../compass/compass';

@Component({
  selector: 'page-antena-details',
  templateUrl: 'antena-details.html'
})
export class AntenaDetailsPage {

  location: any = {};

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AntenaDetailsPage');
    this.location = this.navParams.get('location');
  }

  goToCompass(){
    this.navCtrl.push(CompassPage);
  }

}
