import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDetailRecette } from './resultat';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {


  public liste:IDetailRecette[] = [];

  public data:{
    id_plat:number,
    nom_plat:string
  }[]=[
    {id_plat:8,nom_plat:'sosis'}
  ];

  constructor(private http: HttpClient, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  
}
