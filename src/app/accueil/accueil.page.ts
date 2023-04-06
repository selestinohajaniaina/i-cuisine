import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { env } from 'src/environments/environment';

@Injectable({providedIn: 'any'})
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  @Input()

  private url = this.env.URL_SERVER;
  public username:string= '';
  public email:string='';
  public message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private emailComposer: EmailComposer,
    private env: env
    ) { }

  ngOnInit() {
    this.getInfo(localStorage.getItem('id_user'));
    if(!localStorage.getItem('id_user')){
      this.router.navigate(['../']);
    }
  }
  
  public showSousMenu = false;
  
  clickBtn(){
    this.showSousMenu=!this.showSousMenu;
  }
  
  clickMenu(){
    this.getInfo(localStorage.getItem('id_user'));
    console.log('info getting ...');
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
    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then((e) => {
    // Success!
    console.log('succes in share',e);
    }).catch((e) => {
    // Error!
    console.log('error in share',e);
    });
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

  getInfo(id : any){
    //selection de l'user dans la liste for getting username and email
    this.http.get(`${this.url}/userId/${id}`)
    .subscribe((resultData: any)=>
    {
          console.log(resultData.data[0]);
          this.email = resultData.data[0].email;
          this.username = resultData.data[0].username;
  });
}

//send message for a bug
sendEmail(){
  this.emailComposer.open({
    to:'seha.karoka@gmail.com'
  })
}



}