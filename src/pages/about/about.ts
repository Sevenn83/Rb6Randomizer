import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';
import { OperatorModel } from '../../models/operator-model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  allAttackOperator: OperatorModel[];
  allDefenseOperator: OperatorModel[];

  constructor(public navCtrl: NavController, public getOperatorService: GetOperatorService) {
    this.allAttackOperator = [];
    this.allDefenseOperator = [];
    let that = this;

    this.getOperatorService.getAllActiveAttackOperator().forEach(function (element) {
      that.allAttackOperator.push(new OperatorModel(element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllDeactiveAttackOperator().forEach(function (element) {
      that.allAttackOperator.push(new OperatorModel(element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllActiveDefenseOperator().forEach(function (element) {
      that.allDefenseOperator.push(new OperatorModel(element.name, element.name + ".png", element.pays, element.description))
    });

    this.getOperatorService.getAllDeactiveDefenseOperator().forEach(function (element) {
      that.allDefenseOperator.push(new OperatorModel(element.name, element.name + ".png", element.pays, element.description))
    });
  }
}
