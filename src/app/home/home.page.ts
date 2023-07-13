import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';
import { AlertController, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  private db:SQLiteObject;

  constructor(private router: Router, private alertController: AlertController, private sqlite: SQLite) {}

  ngOnInit(): void {
    if(localStorage.getItem('connected') == 'true' ) {
      this.router.navigate(['../accueil']);
    }
  }

  begin() {
    localStorage.setItem('connected','true');
    this.router.navigate(['../accueil']);
    this.creatDB();
  }

  creatDB() {
    this.sqlite.create({
      name: 'cuisine.db',
      location: 'default'
    }).then((res:SQLiteObject)=>{
      this.db = res;
      console.log('db created');
    })
  }

}  