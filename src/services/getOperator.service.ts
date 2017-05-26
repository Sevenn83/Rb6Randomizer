// Core components
import {Injectable}   from '@angular/core';
import {Http}         from '@angular/http';
import {Platform} from 'ionic-angular';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {OperatorModel} from '../models/operator-model';


@Injectable()
export class GetOperatorService {

  private defenseOperator;
  private attackOperator;


  constructor(private http: Http, private platform: Platform) {
    this.getOperator()
  }

  /***
   * Permet la récupération des opérateur dans les deux fichié json
   */
  private getOperator(): void {

    let urlDefense = 'assets/json/defense-operator.json';
    let urlAttack = 'assets/json/attack-operator.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
      urlDefense = "/android_asset/www/" + urlDefense;
      urlAttack = "/android_asset/www/" + urlAttack;
    }

    // Récupération des Défenseur
    this.http.get(urlDefense)
      .map(res => res.json())
      .subscribe(data => this.defenseOperator = data);

    // Et des attaquant maintenant
    this.http.get(urlAttack)
      .map(res => res.json())
      .subscribe(data => this.attackOperator = data);

  }

  public getRandomDefense(): OperatorModel {
    let randOperator = this.defenseOperator[Math.floor(Math.random() * this.defenseOperator.length)];
    return new OperatorModel(randOperator.name, randOperator.name + ".png", randOperator.pays, randOperator.description);
  }

  public getRandomAttack(): OperatorModel {
    let randOperator = this.attackOperator[Math.floor(Math.random() * this.attackOperator.length)];
    return new OperatorModel(randOperator.name, randOperator.name + ".png", randOperator.pays, randOperator.description);
  }

}
