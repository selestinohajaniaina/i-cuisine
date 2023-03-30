import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as dotenv from 'dotenv';
import { AccueilPage } from './accueil/accueil.page';
// dotenv.config();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private alertController: AlertController, private router: Router,private http: HttpClient) {}


  ngOnInit() {
    // this.username = this.accueil.Name();
  }
}
