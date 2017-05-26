// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import { Platform } from 'ionic-angular';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { OperatorModel } from '../models/operator-model';


@Injectable()
export class JsonService {

  constructor(private http: Http, private platform: Platform) { }

  public getDefenseOperator() {

    let url = 'assets/json/attack-operator.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
      url = "/android_asset/www/" + url;
    }

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

}
