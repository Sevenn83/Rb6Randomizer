import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';
import { OperatorModel } from '../../models/operator-model';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    etatAllAttaquant: boolean = true;
    etatAllDefenseur: boolean = true;
    allAttackOperator: OperatorModel[];
    allDefenseOperator: OperatorModel[];

    constructor(public navCtrl: NavController, public getOperatorService: GetOperatorService, private storage: Storage) {
        this.allAttackOperator = [];
        this.allDefenseOperator = [];
        let that = this;

        this.getOperatorService.getAllDefenseOperator().forEach(function (element) {
            that.storage.get("DEF/" + element.name).then((val) => {
                that.allDefenseOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description, val))
            });
        });

        this.getOperatorService.getAllAttackOperator().forEach(function (element) {
            that.storage.get("ATK/" + element.name).then((val) => {
                that.allAttackOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description, val))
            });
        });
    }

    /***
     * Change l'état de l'opérateur
     * @param id
     */
    changeEtatAttaquant(id: number): void {

        let that = this;

        this.allAttackOperator.forEach(function (element, i) {
            if (element.id === id) {
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
    changeEtatDefenseur(id: number): void {

        let that = this;

        this.allDefenseOperator.forEach(function (element, i) {
            if (element.id === id) {
                if (element.active === true) {
                    that.getOperatorService.activateDefenseOperator(id);
                } else {
                    that.getOperatorService.deactivateDefenseOperator(id);
                }
            }
        })
    }

    changeEtatAllDefenseur(): void {
        this.changeEtatAll(this.etatAllDefenseur, this.allDefenseOperator, "DEF/");
    }

    changeEtatAllAttaquant(): void {
        this.changeEtatAll(this.etatAllAttaquant, this.allAttackOperator, "ATK/");
    }

    private changeEtatAll(value: boolean, side: OperatorModel[], type: string): void {
        let that = this;
        side.forEach(function (element) {
            element.active = value;
            that.storage.set(type + element.name, value);
        })
    }

}
