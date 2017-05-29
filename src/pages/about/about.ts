import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';
import { OperatorModel } from '../../models/operator-model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  etatAllAttaquant: boolean = true;
  etatAllDefenseur: boolean = true;
  allAttackOperator: OperatorModel[];
  allDefenseOperator: OperatorModel[];

  constructor(public navCtrl: NavController, public getOperatorService: GetOperatorService) {
    this.allAttackOperator = [];
    this.allDefenseOperator = [];
    let that = this;

    this.getOperatorService.getAllActiveAttackOperator().forEach(function (element) {
      that.allAttackOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllDeactiveAttackOperator().forEach(function (element) {
      that.allAttackOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllActiveDefenseOperator().forEach(function (element) {
      that.allDefenseOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllDeactiveDefenseOperator().forEach(function (element) {
      that.allDefenseOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description))
    });
  }

  /***
   * Change l'état de l'opérateur
   * @param id
   */
  changeEtatAttaquant(id:number): void {

    let that = this;

    this.allAttackOperator.forEach(function (element, i) {
      if(element.id === id) {
        if (element.active === true) {
          that.getOperatorService.activateAttackOperator(id);
        } else {
          that.getOperatorService.deactivateAttackOperator(id);
        }
      }
    })
  }

  /***
   * Change l'état de l'opérateur
   * @param id
   */
  changeEtatDefenseur(id:number): void {

    let that = this;

    this.allDefenseOperator.forEach(function (element, i) {
      if(element.id === id) {
        if (element.active === true) {
          that.getOperatorService.activateDefenseOperator(id);
        } else {
          that.getOperatorService.deactivateDefenseOperator(id);
        }
      }
    })
  }

  changeEtatAllDefenseur(): void {
    this.changeEtatAll(this.etatAllDefenseur, this.allDefenseOperator);
  }

  changeEtatAllAttaquant(): void {
    this.changeEtatAll(this.etatAllAttaquant, this.allAttackOperator);
  }

  private changeEtatAll(value: boolean, side: OperatorModel[]): void {
    console.log(value);
    side.forEach(function (element) {
      element.active = value;
    })
  }

}
