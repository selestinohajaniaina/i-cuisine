import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from 'src/environments/environment';
import { IDescription } from './description';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  public id_recette:number = 0;
  private url = this.env.URL_SERVER;
  public liste:IDescription = {
    nom_plat:'',
    temps:0,
    dificulte:'',
    etoile:0,
    description:'',
    img:null
  };

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private env: env,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.id_recette = this.route.snapshot.params['id_recette'];
    this.getRecette();
  }

  async getRecette(){
    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/selectRecette/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData.result)
      this.liste.nom_plat=resultData.result[0].nom_plat;
      this.liste.temps=resultData.result[0].temps;
      this.liste.dificulte=resultData.result[0].dificulte;
      this.liste.etoile=resultData.result[0].etoile;
    });

    //description
    this.http.get(`${this.url}/description/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData.result[0]);
      if(resultData.result[0]){
        this.liste.img = resultData.result[0].img?resultData.result[0].img:'';
        this.liste.description= resultData.result[0].description?resultData.result[0].description:'';
      }
      loading.dismiss();
      console.log(this.liste);
    });
  }



}
