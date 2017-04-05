import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';

 
declare const google;
 
@Injectable()
export class GoogleMaps {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  apiKey: string = "AIzaSyA7grETiN_b4gVENDdoAa0b0QzNcogwmwM";
  bounds: any;
  lat: any;
  lng: any;
 
  constructor(public connectivityService: Connectivity, private http: Http) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    // this.getCurrentLocation();
    return this.loadGoogleMaps();
  }
 
  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
        
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.bounds = new google.maps.LatLngBounds();

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: 'assets/icon/technician.png'
        });

        this.bounds.extend(latLng);

        resolve(true);
 
      });
 
    });
 
  }
 
  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
        
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }

  addMarkersToMap(towersLoaded: any []){
     
     for(let tower of towersLoaded){
        this.addMarker(tower);
      }
      this.map.fitBounds(this.bounds);
  }
 
  addMarker(tower: any): void {

    let towerDescription = '<div><div style="color:black">Endereço: '+tower.endereco+'</br>Baitto: '+tower.bairro+'</br>Municipio: '+tower.municipio+'</br>Latitude: '+tower.latitude+'</br>Longitude: '+tower.longitude+'</div>';

    let infowindow = new google.maps.InfoWindow({
      content: towerDescription
    });
 
    let latLng = new google.maps.LatLng(tower.latitude, tower.longitude);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'assets/icon/antena_green.png'
    });

    marker.addListener('click', function () {
        infowindow.open(this.map, marker);
    })

    this.bounds.extend(latLng);
  }

  // getCurrentLocation(): Promise<any> {
  //   return new Promise(resolve => {
  //     Geolocation.getCurrentPosition().then(position => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       console.log(this.lat, this.lng)
  //       this.getFormattedAddress(this.lat, this.lng);
  //     })
  //   })
  // }

  getFormattedAddress(): Promise<any> {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition().then(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        //console.log(this.lat, this.lng);
        this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.lat+","+this.lng+"&key="+this.apiKey)
          .map(res => res.json()).subscribe(data => {
            console.log(data);
            resolve(data);
        })
      })
    });
  }
}