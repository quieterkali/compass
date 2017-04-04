import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tower-modal',
  templateUrl: 'tower-modal.html'
})
export class TowerModalPage {

  tower: any = {};

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    this.tower = this.navParams.get('tower');
  }

}
