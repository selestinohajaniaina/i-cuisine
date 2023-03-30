import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  private url = 'http://localhost:3000'; //'https://i-c-server.onrender.com'
  public username:string= '';
  public email:string='';

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    if(!localStorage.getItem('id_user')){
      this.router.navigate(['../']);
    }
    this.getInfo();
  }

  public showSousMenu = false;

  clickBtn(){
    this.showSousMenu=!this.showSousMenu;
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

  getInfo(){
    //selection de l'user dans la liste for getting username and email
    this.http.get(`${this.url}/userId/${localStorage.getItem('id_user')}`)
    .subscribe((resultData: any)=>
    {
          console.log(resultData.data[0]);
          this.email = resultData.data[0].email;
          this.username = resultData.data[0].username;
  });
}

}
