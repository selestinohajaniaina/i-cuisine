import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

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
      this.error = '';

      //si vrai les infos
      console.log(this.data);

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

}
