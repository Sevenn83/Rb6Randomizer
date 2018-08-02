import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';
import { OperatorModel } from "../../models/operator-model";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    camp = false;
    randArrayOperator: OperatorModel[];


    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public getOperatorService: GetOperatorService) {
        this.randArrayOperator = [];
    }

    getRandOperator() {
        try {
            if (this.camp === false) {
                this.randArrayOperator.unshift(this.getOperatorService.getRandomDefense());
            } else {
                this.randArrayOperator.unshift(this.getOperatorService.getRandomAttack());
            }
        } catch (ex) {
            const alert = this.alertCtrl.create({
                title: 'Erreur',
                subTitle: "Aucun opérateur activé",
                buttons: ['Compris']
            });
            alert.present();
        }
    }

    cleanRandOperator() {
        this.randArrayOperator = [];
    }
}
