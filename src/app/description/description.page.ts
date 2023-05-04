import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { env } from '../variable';
import { IDescription } from './description';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  public id_recette:number = 0;
  private url = this.env.URL_SERVER; //'http://localhost:3000' 
  public liste:IDescription = {
    nom_plat:'',
    temps:0,
    dificulte:'',
    etoile:0,
    description:'',
    img:null
  };
  public outline:boolean=false;
  public name:string = "";
  private id_user = localStorage.getItem('id_user');

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private env: env,
    private http: HttpClient
  ) { }

  changeHeart(){
    this.outline =! this.outline;
    
    if(this.name == "heart"){
      this.deleteFavory();
    }
    if(this.name == "heart-outline"){
      this.insertFavory();
    }

    
  }

  ngOnInit() {
    this.id_recette = this.route.snapshot.params['id_recette'];
    this.getRecette();
    console.log(this.id_user);
    this.ifFavory();
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
        this.liste.img = resultData.result[0].img?this.url+'/'+resultData.result[0].img:'./assets/card-media.png';
        this.liste.description= resultData.result[0].description?resultData.result[0].description:'No description';
      }else{
        this.liste.img = './assets/card-media.png';
        this.liste.description = '(No description)';
      }
      loading.dismiss();
      console.log(this.liste);
    });
  }

  ifFavory(){
    this.http.get(`${this.url}/select/favory/${this.id_recette}/${this.id_user}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData.result.length,' ici le favory');
      this.name = resultData.result.length > 0 ? "heart" : "heart-outline";
    });
  }

  deleteFavory(){
    this.http.delete(`${this.url}/delete/favory/${this.id_recette}/${this.id_user}`).subscribe((resultData: any)=>
    {
        console.log(resultData,"favory Deleted");
    });
    this.ifFavory();
    this.ifFavory();
  }

  insertFavory(){
    let bodyData = {
      id_plat:this.id_recette,
      id_user:this.id_user,
      nom_plat:this.liste.nom_plat
    }

    this.http.post(`${this.url}/insert/favory/`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"isert favory Successfully");
      });
      this.ifFavory();
      this.ifFavory();
  }



}
