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

  private activeDefenseOperator;
  private activeAttackOperator;
  private deactiveDefenseOpertator;
  private deactiveAttackOpertator;


  constructor(private http: Http, private platform: Platform) {
    this.activeDefenseOperator = [];
    this.activeAttackOperator = [];
    this.deactiveDefenseOpertator = [];
    this.deactiveAttackOpertator = [];
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
      .subscribe(data => this.activeDefenseOperator = data);

    // Et des attaquant maintenant
    this.http.get(urlAttack)
      .map(res => res.json())
      .subscribe(data => this.activeAttackOperator = data);

  }

  /***
   * Retourne un opérateur défenseur actif aléatoire
   * @returns {OperatorModel}
   */
  public getRandomDefense(): OperatorModel {
    let randOperator = this.activeDefenseOperator[Math.floor(Math.random() * this.activeDefenseOperator.length)];
    return new OperatorModel(randOperator.id, randOperator.name, randOperator.name + ".png", randOperator.pays, randOperator.description);
  }

  /***
   * Retourne un opérateur attaquant actif aléatoire
   * @returns {OperatorModel}
   */
  public getRandomAttack(): OperatorModel {
    let randOperator = this.activeAttackOperator[Math.floor(Math.random() * this.activeAttackOperator.length)];
    return new OperatorModel(randOperator.id, randOperator.name, randOperator.name + ".png", randOperator.pays, randOperator.description);
  }

  /***
   * Retourne la liste des opérateurs attaquant actifs
   * @returns OperatorModel[]
   */
  public getAllActiveAttackOperator(): OperatorModel[] {
    return this.activeAttackOperator;
  }

  /***
   * Retourne la liste des opérateurs défenseur actif
   * @returns OperatorModel[]
   */
  public getAllActiveDefenseOperator(): OperatorModel[] {
    return this.activeDefenseOperator;
  }

  /***
   * Retourne la liste des opérateurs attaquant desactivé
   * @returns OperatorModel[]
   */
  public getAllDeactiveAttackOperator(): OperatorModel[] {
    return this.deactiveAttackOpertator;
  }

  /***
   * Retourne la liste des opérateurs défenseur desactivé
   * @returns OperatorModel[]
   */
  public getAllDeactiveDefenseOperator(): OperatorModel[] {
    return this.deactiveDefenseOpertator;
  }

  /***
   * Désactive un opérateur attaquant donnée
   * @param id
   */
  public deactivateAttackOperator(id: number): void {

    let that = this;

    this.activeAttackOperator.forEach(function (element, i) {
      if (element.id === id) {
        that.deactiveAttackOpertator.push(element);
        that.activeAttackOperator.splice(i, 1);
      }
    })
  }

  /***
   * Désactive un opérateur défenseur donnée
   * @param id
   */
  public deactivateDefenseOperator(id: number): void {

    let that = this;

    this.activeDefenseOperator.forEach(function (element, i) {
      if (element.id === id) {
        that.deactiveDefenseOpertator.push(element);
        that.activeDefenseOperator.splice(i, 1);
      }
    })
  }

  /***
   * Active un opérateur attaquant donnée
   * @param id
   */
  public activateAttackOperator(id: number): void {


    let that = this;

    this.deactiveAttackOpertator.forEach(function (element, i) {
      if (element.id === id) {
        that.activeAttackOperator.push(element);
        that.deactiveAttackOpertator.splice(i, 1);
      }
    })
  }

  /***
   * Active un opérateur défenseur donnée
   * @param id
   */
  public activateDefenseOperator(id: number): void {


    let that = this;

    this.deactiveDefenseOpertator.forEach(function (element, i) {
      if (element.id === id) {
        that.activeDefenseOperator.push(element);
        that.deactiveDefenseOpertator.splice(i, 1);
      }
    })
  }
}
