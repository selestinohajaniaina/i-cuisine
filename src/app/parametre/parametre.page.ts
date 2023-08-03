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
  public chec: boolean = localStorage.getItem('color-theme')=='dark'? true: false;

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.password = localStorage.getItem('password');
    document.body.setAttribute('color-theme', this.chec ? 'dark' : 'light' );

  }

  mode(){
    this.chec = !this.chec;
    document.body.setAttribute('color-theme', this.chec ? 'dark' : 'light' );
    localStorage.setItem('color-theme',this.chec ? 'dark' : 'light' )
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
    message: "Le changement du langue n'est pas encore disponnible!",
    buttons: [
      {
        text: 'Ok',
        role: 'ok',
      },
    ],
  });
  await alert.present();
}


}
