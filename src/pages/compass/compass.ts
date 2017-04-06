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
  currentHeading: any = 0;
  formattedAddress:string;
  tower: any = {};

  constructor(private navCtrl: NavController, 
              private navParams: NavParams) {
    this.lock();
    this.formattedAddress = this.navParams.get('formattedAddress')
  }

  ionViewDidLoad() {
    this.initCompass();
  }

  // Get the device current compass heading
  initCompass(){
    DeviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
    // Watch the device compass heading change
      this.subscription = DeviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data, this.compass.nativeElement); 
        this.magneticHeading = data.magneticHeading;
        this.getRotate();
      }
    );
    
  }

  getRotate() {
    let rotateValue = this.magneticHeading + this.currentHeading;
    this.compass.nativeElement.style.transform = 'rotate(-'+ rotateValue +'deg)';
    this.currentHeading = this.magneticHeading;
  }


  lock() {
    window.screen.orientation.lock('portrait')
  }

  stopCompass() {
    // Stop watching heading change
    this.subscription.unsubscribe();
  }
}
