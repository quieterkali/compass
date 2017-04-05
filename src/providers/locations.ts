// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { Geolocation } from 'ionic-native'
 
// @Injectable()
// export class Locations {
 
//     data: any;
//     usersLocation: any;
 
//     constructor(private http: Http) {
 
//     }
 
//     getTowers(){
 
//         if(this.data){
//             return Promise.resolve(this.data);
//         }
 
//         return new Promise(resolve => {
 
//             this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {
 
//                 this.data.sort((locationA, locationB) => {
//                     return locationA.distance - locationB.distance;
//                 });
 
//                 resolve(this.data);
//             });
 
//         });
 
//     }
  
 
//     applyHaversine(locations){
        
//         // let usersLocation = {
//         //     lat: 40.713744, 
//         //     lng: -74.009056
//         // };

//         new Promise(resolve => {
//           Geolocation.getCurrentPosition().then((position) => {
//             this.usersLocation = {
//                 lat: position.coords.latitude, 
//                 lng: position.coords.longitude
//             };
//           });
//         }).then(()=>{
//           locations.map((location) => {
//               let placeLocation = {
//                   lat: location.latitude,
//                   lng: location.longitude
//               };
  
//               location.distance = this.getDistanceBetweenPoints(
//                   this.usersLocation,
//                   placeLocation,
//                   'miles'
//               ).toFixed(2);
//           });
//         })
 
 
//         return locations;
//     }
 
// }