import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  private db:SQLiteObject;
  public connect: boolean = false;

  constructor(private router: Router, private alertController: AlertController, private database: DatabaseService) {
    this.database.createDatabase().then(()=>{
      console.log('ok');
      
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('connected') == 'true' ) {
      this.connect = true;
      this.router.navigate(['../accueil']);
    }
  }

  begin() {
    localStorage.setItem('connected','true');
    // this.database.dataDefault();
    this.router.navigate(['../accueil']);
  }

  pass() {
    localStorage.setItem('connected','true');
    this.router.navigate(['../accueil']);
  }

}  