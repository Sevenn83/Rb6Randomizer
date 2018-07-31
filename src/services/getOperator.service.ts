// Core components
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { OperatorModel } from '../models/operator-model';
import { Storage } from '@ionic/storage';


@Injectable()
export class GetOperatorService {

    private allDefenseOperator;
    private allAttackOperator;
    private activeDefenseOperator;
    private activeAttackOperator;
    private deactiveDefenseOperator;
    private deactiveAttackOperator;


    constructor(private readonly http: HttpClient, private readonly platform: Platform, private storage: Storage) {
        this.allDefenseOperator = [];
        this.allAttackOperator = [];
        this.activeDefenseOperator = [];
        this.activeAttackOperator = [];
        this.deactiveDefenseOperator = [];
        this.deactiveAttackOperator = [];
        this.getOperator()
    }

    /***
     * Permet la récupération des opérateurs dans les deux fichiers json
     */
    private getOperator(): void {

        //Nettoyage localstorage
        //this.storage.clear();

        let urlDefense = 'assets/json/defense-operator.json';
        let urlAttack = 'assets/json/attack-operator.json';

        if (this.platform.is('cordova') && this.platform.is('android')) {
            urlDefense = "/android_asset/www/" + urlDefense;
            urlAttack = "/android_asset/www/" + urlAttack;
        }

        // Récupération des défenseurs
        this.http.get(urlDefense)
            .subscribe(data => this.allDefenseOperator = data, null, () => this.saveDefenseOperatorsStatus());

        // Et des attaquants maintenant
        this.http.get(urlAttack)
            .subscribe(data => this.allAttackOperator = data, null, () => this.saveAttackOperatorsStatus());

        /*
        //Afficher dans la console tout ce qui est stocké dans localstorage
        this.storage.forEach((value, key, index) => {
            console.log(key, ": ", value);
        });
        */

        this.storage.get("DEF/allOperators").then((val) => {
            if (val === null) {
                this.storage.set("DEF/allOperators", true);
            }
        });

        this.storage.get("ATK/allOperators").then((val) => {
            if (val === null) {
                this.storage.set("ATK/allOperators", true);
            }
        });
    }

    /***
     * Enregistre l'état de tous les opérateurs défense
     */
    public saveDefenseOperatorsStatus(): void {
        this.allDefenseOperator.forEach((element) => {
            this.storage.get("DEF/" + element.name).then((val) => {
                if (val === null) {
                    this.storage.set("DEF/" + element.name, true);
                }
                if (val === true) {
                    this.activeDefenseOperator.push(element);
                } else {
                    this.deactiveDefenseOperator.push(element);
                }
            });
        });
    }

    /***
     * Enregistre l'état de tous les opérateurs attaque
     */
    public saveAttackOperatorsStatus(): void {
        this.allAttackOperator.forEach((element) => {
            this.storage.get("ATK/" + element.name).then((val) => {
                if (val === null) {
                    this.storage.set("ATK/" + element.name, true);
                }
                if (val === true) {
                    this.activeAttackOperator.push(element);
                } else {
                    this.deactiveAttackOperator.push(element);
                }
            });
        });
    }

    /***
     * Retourne un opérateur défenseur actif aléatoire
     * @returns {OperatorModel}
     */
    public getRandomDefense(): OperatorModel {
        const randOperator = this.activeDefenseOperator[Math.floor(Math.random() * this.activeDefenseOperator.length)];
        return new OperatorModel(randOperator.id, randOperator.name, randOperator.name + ".png", randOperator.pays, randOperator.description);
    }

    /***
     * Retourne un opérateur attaquant actif aléatoire
     * @returns {OperatorModel}
     */
    public getRandomAttack(): OperatorModel {
        const randOperator = this.activeAttackOperator[Math.floor(Math.random() * this.activeAttackOperator.length)];
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
     * Retourne la liste des opérateurs attaquants
     * @returns OperatorModel[]
     */
    public getAllAttackOperator(): OperatorModel[] {
        return this.allAttackOperator;
    }

    /***
     * Retourne la liste des opérateurs défenseurs
     * @returns OperatorModel[]
     */
    public getAllDefenseOperator(): OperatorModel[] {
        return this.allDefenseOperator;
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
        return this.deactiveAttackOperator;
    }

    /***
     * Retourne la liste des opérateurs défenseur desactivé
     * @returns OperatorModel[]
     */
    public getAllDeactiveDefenseOperator(): OperatorModel[] {
        return this.deactiveDefenseOperator;
    }

    /***
     * Active un opérateur attaquant donné
     * @param id
     */
    public activateAttackOperator(id: number): void {

        this.deactiveAttackOperator.forEach((element, i) => {
            if (element.id === id) {
                this.storage.set("ATK/" + element.name, true);
                this.activeAttackOperator.push(element);
                this.deactiveAttackOperator.splice(i, 1);
            }
        });
    }

    /***
     * Désactive un opérateur attaquant donné
     * @param id
     */
    public deactivateAttackOperator(id: number): void {
        this.activeAttackOperator.forEach((element, i) => {
            if (element.id === id) {
                this.storage.set("ATK/" + element.name, false);
                this.deactiveAttackOperator.push(element);
                this.activeAttackOperator.splice(i, 1);
            }
        });
    }

    /***
     * Active un opérateur défenseur donné
     * @param id
     */
    public activateDefenseOperator(id: number): void {
        this.deactiveDefenseOperator.forEach((element, i) => {
            if (element.id === id) {
                this.storage.set("DEF/" + element.name, true);
                this.activeDefenseOperator.push(element);
                this.deactiveDefenseOperator.splice(i, 1);
            }
        });
    }

    /***
     * Désactive un opérateur défenseur donné
     * @param id
     */
    public deactivateDefenseOperator(id: number): void {
        this.activeDefenseOperator.forEach((element, i) => {
            if (element.id === id) {
                this.storage.set("DEF/" + element.name, false);
                this.deactiveDefenseOperator.push(element);
                this.activeDefenseOperator.splice(i, 1);
            }
        });
    }
}
