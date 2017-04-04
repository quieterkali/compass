import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Towers {

  data: any;
  usersLocation: any;
 

  constructor(public http: Http) {
    console.log('Hello Towers Provider');
  }

   getTowers(){
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
            this.http.get('assets/data/towers.json').map(res => res.json()).subscribe(data => {
                this.data = data.towers;
                this.data.sort((towerA, towerB) => {
                    return towerA.distance - towerB.distance;
                });
                resolve(this.data);
            });
 
        });
 
    }

}
