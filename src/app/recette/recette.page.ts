import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IRecette } from './recette';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {

  private url = this.env.URL_SERVER;
  public liste:IRecette[]=[];

  public nom_plat:string = '';
  public err:string = '';

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private env: env) { }

  ngOnInit() {
    this.getRecette();
  }

  //selection
  async getRecette(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/select/plat/`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      loading.dismiss();
      console.log(resultData.result);
    });
  }
  //ajout
  addRecette(bodyData:{}){
    this.http.post(`${this.url}/insert/recette`,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"categorie Successfully");
    });
  }

  btnAjout(){
    if(this.nom_plat!=''){
      let newValue = {
        "nom_plat" : this.nom_plat,
      }

      this.addRecette(newValue);
      this.nom_plat='';
      this.getRecette();
      this.getRecette();
      this.err="";
    }else{
      this.err="Champs vide non valide.";
    }
  }

}
