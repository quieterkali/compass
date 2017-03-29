import { Component, ViewChild, ElementRef} from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
declare var window;

@Component({
  selector: 'page-compass',
  templateUrl: 'compass.html'
})
export class CompassPage {

  @ViewChild('compass') compass: ElementRef;
  subscription: any;
  magneticHeading: any;

  // animations: [
  //   trigger('rot', [
  //     state('flipped', style({
  //       transform: 'rotate(180deg)',
  //       backgroundColor: '#f50e80'
  //     })),
  //     transition('* => flipped', animate('400ms ease'))
  //   ])
  // ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompassPage');
    this.initCompass();
  }

  // Get the device current compass heading
  initCompass(){
    //this.div2 = document.getElementById("div2")[0];
    DeviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
    // Watch the device compass heading change
      this.subscription = DeviceOrientation.watchHeading({frequency:1000}).subscribe(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data, this.compass.nativeElement); 
        this.magneticHeading = data.magneticHeading;
        this.getRotate();
      }
    );
    
  }

  getRotate(){
    //this.lock();
    this.compass.nativeElement.style.transform = 'rotate(-'+this.magneticHeading+'deg)';
  }

  // getRotate(){
  //   //this.lock();
  //   return 'rotate(-'+this.magneticHeading+'deg)';
  // }

  lock(){
    window.screen.orientation.lock('portrait')
    //setTimeout(ScreenOrientation.lockOrientation("portrait"),500);
  }

  stopCompass(){
    // Stop watching heading change
    this.subscription.unsubscribe();
  }
}
