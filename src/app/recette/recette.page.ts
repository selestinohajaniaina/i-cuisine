import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IRecette } from './recette';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {

  public nbr_person:number;
  public err:string = '';

  constructor(private http: HttpClient, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  add() {

  }

}
