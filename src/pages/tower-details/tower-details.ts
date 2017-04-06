import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';


import { Towers } from "../../providers/towers";
import { RecommendationsPage } from "../recommendations/recommendations";


@Component({
  selector: 'page-tower-details',
  templateUrl: 'tower-details.html'
})
export class TowerDetailsPage {

  tower: any = {};
  channels: any [];
  recommendations: string;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private towersProvider: Towers ) {}

  ionViewDidLoad() {
    this.tower = this.navParams.get('tower');
    this.loadingChannels();
  }

  goToRecommendationsPage(){
    console.log(this.recommendations);
    this.navCtrl.push(RecommendationsPage, {recommendations: this.recommendations});
  }

  loadingChannels(){
    let loader = this.loadingCtrl.create({
      content: 'Carregando',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.towersProvider.getTowerChannel(this.tower.id).then(result => {
        let tower = result.channels.filter(el => {
          return el.id == this.tower.id
        })
        this.channels = tower[0].emissora;
        this.recommendations = tower[0].recommendations;
        loader.dismiss();
      })
    })
  }

}
