import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDetailRecette } from './resultat';
import { LoadingController } from '@ionic/angular';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  private url = this.env.URL_SERVER;

  public liste:IDetailRecette[] = [];

  public data:{
    id_plat:number,
    nom_plat:string
  }[]=[
    {id_plat:8,nom_plat:'sosis'}
  ];

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private env: env) { }

  ngOnInit() {
    this.getAllRecette();
  }
  
  //selection de tout les plat (recette) enregistré
  async getAllRecette(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/selectAvis/`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      loading.dismiss();
      console.log(this.liste);
    });
  }

  getNom(id:number){
    return this.data.find(item => item.id_plat == id)?.nom_plat;
  }

}
