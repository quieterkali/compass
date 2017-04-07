import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
