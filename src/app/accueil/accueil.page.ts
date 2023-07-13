import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({providedIn: 'any'})
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  public username:string= '';
  public email:string='';
  public message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private emailComposer: EmailComposer,
    ) { }

  ngOnInit() {
      if(localStorage.getItem('connected') == 'false' ) {
        this.router.navigate(['../home']);
      }
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

  //share in social

  sShare(){
    this.socialSharing.shareWithOptions({
      message:'Application de recette pour la Cuisine',
      subject:'Application android',
      files:[],
      url:'',
      chooserTitle:'CuisineApp'
    })
  }
  

  //show alert avant quiter
  async sortir() {
        localStorage.setItem("connected",'false');
        this.router.navigate(['../home']);
  }

//send message for a bug
sendEmail(){
  this.emailComposer.open({
    to:'seha.karoka@gmail.com'
  })
}



}