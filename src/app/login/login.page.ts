import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from '../variable';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController,
    private env: env
    ) { }

  private url = this.env.URL_SERVER; //'http://localhost:3000' 
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
    
  }

  async login(email:any){
    const loading = await this.loadingCtrl.create({
      message:'connexion ...',
    });
    loading.present();
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
            loading.dismiss();
            this.router.navigate(['../accueil']);
          }else{
            loading.dismiss();
            this.error = 'mots de passe incorrect, veillez ressayer!';
          }
        }else{
          loading.dismiss();
          this.error = 'compte introuvable';
        }
      });
    }


}
