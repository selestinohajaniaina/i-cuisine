import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

}  