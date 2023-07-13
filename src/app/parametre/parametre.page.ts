import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  public showPassword:boolean=true;
  public type:string= 'password';
  public password: string | null = '';
  public error: string = '';
  public data:{}={};
  public id_user: number = 0;

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.password = localStorage.getItem('password');
  }

  checked(){
    this.showPassword =! this.showPassword;
    this.type = this.showPassword ? 'password': 'text';
  }

  async getInfo(){

    const loading = await this.loadingCtrl.create({
      message:'Recuperation des informations ...',
    });
    loading.present();
    loading.dismiss();
}


async presentAlert() {
  const alert = await this.alertController.create({
    message: "Vous risquez de suprimer deffinitivement le mots de verouillage, et l'application sera mettre en mode initial. Nous garderons vos donnés personnel, voulez-vous vraiment continuer ?",
    buttons: [
      {
        text: 'Annuler',
        role: 'annuler',
      },
      {
        text: 'Continuer',
        role: 'Continuer',
      },
    ],
  });
  await alert.present();
  const { role, data } = await alert.onDidDismiss();
  if(role=='Continuer'){
    
  }

}


}
