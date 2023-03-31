import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private url = 'https://i-c-server.onrender.com'; //'http://localhost:3000'

  public data:object = {};

  public error='';

  constructor(private http: HttpClient, private router:Router, private loadingCtrl: LoadingController) { }

  public showPassword:boolean=true;
  public type:string= 'password';

  ngOnInit() {
  }

  public userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl('')
  });

  submit(){
    if(this.userForm.value.email!=''&&this.userForm.value.username!=''&&this.userForm.value.password!=''&&this.userForm.value.confirm!=''){
      
      if( this.userForm.value.password ==this.userForm.value.confirm ){
        //si vrai les infos
        this.error ='';
        this.data = this.userForm.value;
        console.log(this.data);
        this.signupToDB(this.data);
        this.showLoading();

      }else{
        this.data = {}
        this.error ='les deux mots de passes doivent etre identique.';

      }

    }else{

      this.data = {}
      this.error ='remplir tout les champs.';
      
    }
  }

  checked(){
    this.showPassword =! this.showPassword;
    this.type = this.showPassword ? 'password': 'text';
  }

  //add new user
  signupToDB(bodyData:{}){
    this.http.post(`${this.url}/person/add/`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"signup Successfully");
          this.router.navigate(['../accueil']);
      });
  }

  async showLoading(){
    const loading = await this.loadingCtrl.create({
      message:'connexion ...',
      duration:3000
    });
    loading.present();
  }

}
 