import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit(): void {
    if(localStorage.getItem('connected') == 'true' ) {
      this.router.navigate(['../accueil']);
    }
  }

  skip() {
    localStorage.setItem("connected",'true');
    this.router.navigate(['../accueil']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Entrer une mots de passe facile a retenir pour votre recette:',
      inputs: [
        {
          name: 'password',
          type: 'text',
          placeholder: 'Entrez votre texte ici'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'annuler',
        },
        {
          text: 'Valider',
          role: 'valider',
        },
      ],
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
    if(role=='valider'){
      if(data.values.password){
        console.log(data);
        localStorage.setItem("password",data.values.password);
        localStorage.setItem("connected",'true');
        this.router.navigate(['../accueil']);
      }
    }

  }

}  