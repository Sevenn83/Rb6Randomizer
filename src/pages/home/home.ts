import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { JsonService } from '../../services/json.service';
import { OperatorModel } from '../../models/operator-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  camp: boolean = false;

  constructor(public navCtrl: NavController, public jsonService: JsonService) {
     jsonService.getDefenseOperator();
  }

  showState() {
    console.log(this.camp);
  }
}
