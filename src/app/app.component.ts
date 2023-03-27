import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController, private router: Router) {}

  public showSousMenu = false;

  clickBtn(){
    this.showSousMenu=!this.showSousMenu;
  }

  hideSousMenu(){
    this.showSousMenu = false;
  }

  //show alert avant de deconnecter
  async logout() {
    this.showSousMenu = false;
    const alert = await this.alertController.create({
      message: 'Voullez-vous vraiment deconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
        },
        {
          text: 'deconnexion',
          role: 'ok',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='ok'){
      //if ok
      localStorage.removeItem('id_user');
      this.router.navigate(['../']);
  }

  }
  

  //show alert avant quiter
  async sortir() {
    this.showSousMenu = false;
    const alert = await this.alertController.create({
      message: 'Etes-vous sur de quiter l\'Application?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
        },
        {
          text: 'ok',
          role: 'quiter',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='quiter'){
      //if ok
    App.exitApp();
  }

  }

}
