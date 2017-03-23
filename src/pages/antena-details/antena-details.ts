import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-antena-details',
  templateUrl: 'antena-details.html'
})
export class AntenaDetailsPage {

  location: any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AntenaDetailsPage');
    this.location = this.navParams.get('location');
  }

}
