import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tower-details',
  templateUrl: 'tower-details.html'
})
export class TowerDetailsPage {

  tower: any = {};

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    this.tower = this.navParams.get('tower');
    console.log(this.tower)
  }

}
