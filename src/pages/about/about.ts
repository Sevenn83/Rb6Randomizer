import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public getOperatorService: GetOperatorService) {

  }
}
