import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
  private url = 'http://localhost:3000'; //'https://i-c-server.onrender.com'

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    // this.id_user = localStorage.getItem('id_user');
    this.getInfo();
  }

  checked(){
    this.showPassword =! this.showPassword;
    this.type = this.showPassword ? 'password': 'text';
  }

  getInfo(){
    //selection de l'user dans la liste for getting username and email
    this.http.get(`${this.url}/userId/${localStorage.getItem('id_user')}`)
    .subscribe((resultData: any)=>
    {
          console.log(resultData.data[0]);
          this.email = resultData.data[0].email;
          this.username = resultData.data[0].username;
          this.password = resultData.data[0].password;
  });
}

//upDate Profil

upDate(){
  if(this.email!=''&&this.username!=''&&this.password!=''){
      
      //si vrai les infos
      this.error ='';
      this.data = {
        email:this.email,
        username:this.username,
        password:this.password
      };
      console.log(this.data);
      this.http.put(`${this.url}/update/${localStorage.getItem('id_user')}`,this.data).subscribe((resultData: any)=>
    {
      console.log(resultData);
      
    });
    this.showLoading();

  }else{

    this.data = {}
    this.error ='remplir tout les champs.';
    
  }
}

async showLoading(){
  const loading = await this.loadingCtrl.create({
    message:'Chargement de modification...',
    duration:3000
  });
  loading.present();
  this.router.navigate(['../accueil']);
}

}
