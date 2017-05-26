import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GetOperatorService} from '../../services/getOperator.service';
import {OperatorModel} from "../../models/operator-model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  camp: boolean = false;
  randArrayOperator: OperatorModel[];


  constructor(public navCtrl: NavController, public getOperatorService: GetOperatorService) {
    this.randArrayOperator = [];
  }

  getRandOperator() {
    this.randArrayOperator.unshift(this.getOperatorService.getRandomDefense());
    console.log(this.randArrayOperator);
  }

  cleanRandOperator() {
    this.randArrayOperator = [];
  }
}
