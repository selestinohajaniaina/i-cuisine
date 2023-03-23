import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public data:object = {};

  public error='';

  constructor() { }

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

}
 