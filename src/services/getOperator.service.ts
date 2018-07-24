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


    constructor(private http: HttpClient, private platform: Platform, private storage: Storage) {
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
        this.storage.forEach((value, key, index) => {
            console.log(key, ": ", value);
        });
        */
    }

    /***
     * Enregistre l'état de tous les opérateurs défense
     */
    public saveDefenseOperatorsStatus(): void {
        let that = this;
        this.allDefenseOperator.forEach(function (element) {
            that.storage.get("DEF/" + element.name).then((val) => {
                if (val === null) {
                    that.storage.set("DEF/" + element.name, true);
                }
                if (val === true) {
                    that.activeDefenseOperator.push(element);
                } else {
                    that.deactiveDefenseOperator.push(element);
                }
            });
        });
    }

    /***
     * Enregistre l'état de tous les opérateurs attaque
     */
    public saveAttackOperatorsStatus(): void {
        let that = this;
        this.allAttackOperator.forEach(function (element) {
            that.storage.get("ATK/" + element.name).then((val) => {
                if (val === null) {
                    that.storage.set("ATK/" + element.name, true);
                }
                if (val === true) {
                    that.activeAttackOperator.push(element);
                } else {
                    that.deactiveAttackOperator.push(element);
                }
            });
        });
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
        
        let that = this;

        this.deactiveAttackOperator.forEach(function (element, i) {
            if (element.id === id) {
                that.storage.set("ATK/" + element.name, true);
                that.activeAttackOperator.push(element);
                that.deactiveAttackOperator.splice(i, 1);
            }
        })
    }

    /***
     * Désactive un opérateur attaquant donné
     * @param id
     */
    public deactivateAttackOperator(id: number): void {

        let that = this;

        this.activeAttackOperator.forEach(function (element, i) {
            if (element.id === id) {
                that.storage.set("ATK/" + element.name, false);
                that.deactiveAttackOperator.push(element);
                that.activeAttackOperator.splice(i, 1);
            }
        })
    }

    /***
     * Active un opérateur défenseur donné
     * @param id
     */
    public activateDefenseOperator(id: number): void {
        
        let that = this;

        this.deactiveDefenseOperator.forEach(function (element, i) {
            if (element.id === id) {
                that.storage.set("DEF/" + element.name, true);
                that.activeDefenseOperator.push(element);
                that.deactiveDefenseOperator.splice(i, 1);
            }
        })
    }

    /***
     * Désactive un opérateur défenseur donné
     * @param id
     */
    public deactivateDefenseOperator(id: number): void {

        let that = this;

        this.activeDefenseOperator.forEach(function (element, i) {
            if (element.id === id) {
                that.storage.set("DEF/" + element.name, false);
                that.deactiveDefenseOperator.push(element);
                that.activeDefenseOperator.splice(i, 1);
            }
        })
    }
}
