import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpClient, private router: Router, private loadingCtrl: LoadingController) { }

  private url = 'https://i-c-server.onrender.com'; //'http://localhost:3000'
  public showPassword:boolean=true;
  public type:string= 'password';
  
  public data:object = {};

  public error='';

  public userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  connexion(){
    if(this.userForm.value.email!=''&&this.userForm.value.password!=''){
      this.data = this.userForm.value;
      this.login(this.userForm.value.email);
      this.error = '';
      this.showLoading();
    }else{

      this.data = {}
      this.error ='remplir tout les champs.';
      
    }
  }

  checked(){
    this.showPassword =! this.showPassword;
    this.type = this.showPassword ? 'password': 'text';
  }

  ngOnInit() {
    if(localStorage.getItem('id_user')){
      this.router.navigate(['../accueil']);
    }
  }

  login(email:any){
    //selection de l'user dans la liste for login
      this.http.get(`${this.url}/user/${email}`)
      .subscribe((resultData: any)=>
      {
        if(resultData.status==true&&resultData.data.length>0){
          if(resultData.data[0].password == this.userForm.value.password){
            console.log(resultData.data[0]);
            this.data = resultData.data[0];
            localStorage.setItem('id_user',resultData.data[0].id_user);
            this.userForm.value.password='';
            this.userForm.value.email='';
            this.router.navigate(['../accueil']);
          }else{
            this.error = 'mots de passe incorrect, veillez ressayer!';
          }
        }else{
          this.error = 'compte introuvable';
        }
      });
    }

    async showLoading(){
      const loading = await this.loadingCtrl.create({
        message:'connexion ...',
        duration:1500
      });
      loading.present();
    }


}
