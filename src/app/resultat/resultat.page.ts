import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDetailRecette } from './resultat';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  private url = 'https://i-c-server.onrender.com'; //'http://localhost:3000'

  public liste:IDetailRecette[] = [];

  public data:{
    id_plat:number,
    nom_plat:string
  }[]=[
    {id_plat:8,nom_plat:'sosis'}
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllRecette();
  }
  
  //selection de tout les plat (recette) enregistré
  getAllRecette(){
    this.http.get(`${this.url}/select/avis/`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      console.log(this.liste);
      
      
    });
  }

  getNamePlat(id_pl:number){
    this.http.get(`${this.url}/select/plat/${id_pl}`)
      .subscribe((resultData: any)=>{
        let data1 = ({
          id_plat:resultData.result[0].id_plat,
          nom_plat:resultData.result[0].nom_plat
        });
      });
  }

  getNom(id:number){
    return this.data.find(item => item.id_plat == id)?.nom_plat;
  }

}