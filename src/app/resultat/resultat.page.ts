import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDescRecette, IDetailRecette } from './resultat';
import { LoadingController } from '@ionic/angular';
import { env } from '../variable';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  private url = this.env.URL_SERVER; //'http://localhost:3000' 
  private _recetteFilter: string = '';
  public filteredRecette:IDetailRecette[] = [];
  public liste:IDetailRecette[] = [];
  public listImg:IDescRecette[]=[];

  public data:{
    id_plat:number,
    nom_plat:string
  }[]=[
    {id_plat:8,nom_plat:'sosis'}
  ];

  constructor(private http: HttpClient, private loadingCtrl: LoadingController,
    private env: env
    ) { }

  public get recetteFilter(): string{
    return this._recetteFilter;
  }

  public set recetteFilter(filter: string){
    this._recetteFilter = filter;
    this.filteredRecette = this.recetteFilter ? this.filterHotels(this.recetteFilter) : this.liste;
}

private filterHotels(criteria:string):IDetailRecette[] {
  criteria = criteria.toLocaleLowerCase();
  const res = this.liste.filter(
      (recette:IDetailRecette)=> recette.nom_plat.toLocaleLowerCase().indexOf(criteria) != -1
  );
  return res;
}

  ngOnInit() {
    this.getAllRecette();
    this.getDescr();
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
    this.filteredRecette = this.liste;
    });
  }

  //selection de tout les description du plat (recette) enregistré
  async getDescr(){

    this.http.get(`${this.url}/select/description`)
    .subscribe((resultData: any)=>
    {
      this.listImg = resultData.result ;
      console.log(this.listImg);
    console.log("hello " , this.getImg(10));
    });
  }

  getImg(id:number){
    return this.url+"/"+this.listImg.find(item => item.id_plat == id)?.img;
  }

  getNom(id:number){
    return this.data.find(item => item.id_plat == id)?.nom_plat;
  }

}
