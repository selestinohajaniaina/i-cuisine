import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccueilPage } from './accueil/accueil.page';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private emailComposer: EmailComposer, private router: Router,private http: HttpClient) {}


  ngOnInit() {
    // this.username = this.accueil.Name();
  }

  sendEmail(){
    this.emailComposer.open({
      to:'seha.karoka@gmail.com'
    })
  }
  
}
