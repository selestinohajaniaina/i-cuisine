import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from 'src/environments/environment';

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
  private url = this.env.URL_SERVER;

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router, private env: env) { }

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

//upDate Profil

async upDate(){
  // if(this.email!=''&&this.username!=''&&this.password!=''){
      
  //     //si vrai les infos
  //     this.error ='';
  //     this.data = {
  //       email:this.email,
  //       username:this.username,
  //       password:this.password
  //     };
  //     console.log(this.data);

  //     const loading = await this.loadingCtrl.create({
  //       message:'Modification, patientez ...',
  //     });
  //     loading.present();
  //   loading.dismiss();
  //   this.router.navigate(['../accueil']);

  // }else{

  //   this.data = {}
  //   this.error ='remplir tout les champs.';
    
  // }
}


}
