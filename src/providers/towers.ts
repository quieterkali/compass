import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Towers {

  data: any;
  usersLocation: any;
  channels: any;
 

  constructor(public http: Http) {
    console.log('Hello Towers Provider');
  }

  getTowers(){
    if(this.data){
        return Promise.resolve(this.data);
    }
    return this.http.get('assets/data/towers-map.json')
      .map(res => res.json())
      .toPromise();
  }

  getTowerChannel(id){
    if(this.channels){
      return Promise.resolve(this.channels);
    } 
    return this.http.get('assets/data/towers-channels.json')
      .map(res => res.json())
      .toPromise();
  }
}
