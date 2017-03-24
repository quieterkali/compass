import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';
 
declare const google;
 
@Injectable()
export class GoogleMaps {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string = "AIzaSyA7grETiN_b4gVENDdoAa0b0QzNcogwmwM";
  bounds: any;
  service: any;
  currentPosition: any;
 
  constructor(public connectivityService: Connectivity) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
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
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
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

        this.currentPosition = position;

        this.bounds = new google.maps.LatLngBounds();
 
        //let latLng = new google.maps.LatLng(40.713744, -74.009056);
        
        console.log(position);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        let market = new google.maps.Marker({
          position: latLng,
          map: this.map
        });

        this.bounds.extend(latLng)

        this

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

  addMarkersToMap(locations: any []){
     
     for(let location of locations){
        this.addMarker(location);
      }
      this.map.fitBounds(this.bounds);
  }
 
  addMarker(location: any): void {

    let antenaDescription = '<div>'+location.title+'</div>';

    let infowindow = new google.maps.InfoWindow({
      content: antenaDescription
    });
 
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'assets/icon/anten2.png'
    });

    marker.addListener('click', function(){
      infowindow.open(this.map, marker);
    })

    this.bounds.extend(latLng);
    this.markers.push(marker);  
  }

  evaluateDistance(latLng: any){
    this.service = new google.maps.DistanceMatrixService();
    //let latLng = new google.maps.LatLng(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
    this.service.getDistanceMatrix({
        origins: [latLng],
        destinations: ['rio de janeiro'],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC}, 
        callback);

    function callback(response, status) {
      console.log(response);
    }
  }
}