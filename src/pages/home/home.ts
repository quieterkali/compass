import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  tab1Root: any = MapPage;
  tab2Root: any = ListPage;
 
  constructor(){
 
  }
 
}




// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { Geolocation } from 'ionic-native';
// import { NavController } from 'ionic-angular';

// declare const google;

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

//   @ViewChild('map') mapElement: ElementRef;
//   map: any;

//   ionViewDidLoad(){
//     console.log(this.mapElement.nativeElement);
//     this.loadMap();
//   }

//   constructor(public navCtrl: NavController) {
    
//   }

//   loadMap(){
 
//     Geolocation.getCurrentPosition().then((position) => {
 
//       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
//       let mapOptions = {
//         center: latLng,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       }
 
//     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
//     }, (err) => {
//       console.log(err);
//     });
//   }

//   addMarker(){
//     let marker = new google.maps.Marker({
//       map: this.map,
//       animation: google.maps.Animation.DROP,
//       position: this.map.getCenter()
//     });
  
//     let content = "<h4>Information!</h4>";          
  
//     this.addInfoWindow(marker, content);
//   }

//   addInfoWindow(marker, content){
  
//     let infoWindow = new google.maps.InfoWindow({
//       content: content
//     });
  
//     google.maps.event.addListener(marker, 'click', () => {
//       infoWindow.open(this.map, marker);
//     });
  
//   }
// }
