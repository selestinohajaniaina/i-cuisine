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
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public error: string = '';
  public data:{}={};
  public id_user: number = 0;
  private url = this.env.URL_SERVER;

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router, private env: env) { }

  ngOnInit() {
    // this.id_user = localStorage.getItem('id_user');
    this.getInfo();
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

    //selection de l'user dans la liste for getting username and email
    this.http.get(`${this.url}/userId/${localStorage.getItem('id_user')}`)
    .subscribe((resultData: any)=>
    {
          console.log(resultData.data[0]);
          this.email = resultData.data[0].email;
          this.username = resultData.data[0].username;
          this.password = resultData.data[0].password;
          loading.dismiss();
  });
}

//upDate Profil

async upDate(){
  if(this.email!=''&&this.username!=''&&this.password!=''){
      
      //si vrai les infos
      this.error ='';
      this.data = {
        email:this.email,
        username:this.username,
        password:this.password
      };
      console.log(this.data);

      const loading = await this.loadingCtrl.create({
        message:'Modification, patientez ...',
      });
      loading.present();

      this.http.put(`${this.url}/update/${localStorage.getItem('id_user')}`,this.data).subscribe((resultData: any)=>
    {
      console.log(resultData);
      loading.dismiss();
    });
    this.router.navigate(['../accueil']);

  }else{

    this.data = {}
    this.error ='remplir tout les champs.';
    
  }
}


}
