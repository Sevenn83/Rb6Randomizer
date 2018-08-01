import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GetOperatorService } from '../../services/getOperator.service';
import { OperatorModel } from '../../models/operator-model';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    etatAllAttaquant = true;
    etatAllDefenseur = true;
    allAttackOperator: OperatorModel[];
    allDefenseOperator: OperatorModel[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public getOperatorService: GetOperatorService,
        private storage: Storage, private readonly translate: TranslateService) {
        this.allAttackOperator = [];
        this.allDefenseOperator = [];

        // Bouton allOperators Défenseurs
        this.storage.get("DEF/allOperators").then((val) => {
            if (val !== null) {
                this.etatAllDefenseur = val;
            }
        });
        // Bouton allOperators Attaquants
        this.storage.get("ATK/allOperators").then((val) => {
            if (val !== null) {
                this.etatAllAttaquant = val;
            }
        });
        
        this.getOperatorService.getAllDefenseOperator().forEach((element) => {
            this.storage.get(`DEF/${element.name}`).then((val) => {
                this.allDefenseOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description, val))
            });
        });

        this.getOperatorService.getAllAttackOperator().forEach((element) => {
            this.storage.get(`ATK/${element.name}`).then((val) => {
                this.allAttackOperator.push(new OperatorModel(element.id, element.name, element.name + ".png", element.pays, element.description, val))
            });
        });
    }

    /***
     * Change l'état de l'opérateur Attaquant
     * @param id
     */
    changeEtatAttaquant(id: number): void {
        this.allAttackOperator.forEach((element, i) => {
            if (element.id === id) {
                if (element.active === true) {
                    this.getOperatorService.activateAttackOperator(id);
                } else {
                    this.getOperatorService.deactivateAttackOperator(id);
                }
            }
        })
    }

    /***
     * Change l'état de l'opérateur Défenseur
     * @param id
     */
    changeEtatDefenseur(id: number): void {
        this.allDefenseOperator.forEach((element, i) => {
            if (element.id === id) {
                if (element.active === true) {
                    this.getOperatorService.activateDefenseOperator(id);
                } else {
                    this.getOperatorService.deactivateDefenseOperator(id);
                }
            }
        })
    }

    /***
     * Change l'état de tous les opérateurs Défenseurs
     */
    changeEtatAllDefenseur(): void {
        this.changeEtatAll(this.etatAllDefenseur, this.allDefenseOperator, "DEF/");
        this.storage.set("DEF/allOperators", this.etatAllDefenseur);
    }

    /***
     * Change l'état de tous les opérateurs Attaquants
     */
    changeEtatAllAttaquant(): void {
        this.changeEtatAll(this.etatAllAttaquant, this.allAttackOperator, "ATK/");
        this.storage.set("ATK/allOperators", this.etatAllDefenseur);
    }

    /***
     * Change l'état de tous les opérateurs Défense
     */
    private changeEtatAll(value: boolean, side: OperatorModel[], type: string): void {
        side.forEach((element) => {
            element.active = value;
            this.storage.set(type + element.name, value);
        })
    }

    /***
     * Affiche les infos de l'opérateur
     */
    private operatorInfos(operator: OperatorModel): void {
        this.translate.get(operator.description).subscribe((val) => {
            const alert = this.alertCtrl.create({
                title: `<img src='assets/icon/OPs-badges/${operator.image}' alt='op badge'>`,
                subTitle: `${operator.name} (${operator.pays})`,
                message: val
            });
            alert.present();
        });
    }
}
