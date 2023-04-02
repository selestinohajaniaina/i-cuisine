import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IProduit } from '../produit/produit';
import { IDetail } from './detail';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private url = this.env.URL_SERVER;
  public nbrPerson:number = 0;
  public qteProduit:number = 0;
  public id_recette:number = 0;
  public varProduit:string = '';
  public nom_recette:string = '';
  public err:string = '';
  public liste:IDetail[]=[];
  public listePro:IProduit[]=[];
  public produit:string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController, private env: env) { }

  ngOnInit() {

    this.id_recette = this.route.snapshot.params['id_recette'];

    this.route.queryParams.subscribe(params => {
      this.nbrPerson = params['person'];
    });
    console.log(this.nbrPerson + " r= " + this.id_recette);

    this.getPlat();
    this.getAllProduit();
    this.getProduit();
  }

  //get plat where id=id_recette
  getPlat(){
    this.http.get(`${this.url}/select/plat/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      this.nom_recette = resultData.result[0].nom_plat;
      console.log(this.nom_recette);
    });
  }

  //get all produit where id=id_recette for list
  async getAllProduit(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();

    this.http.get(`${this.url}/select/detail/${this.id_recette}`)
    .subscribe((resultData: any)=>
    {
      this.liste = resultData.result;
      loading.dismiss();
      console.log(this.liste);
    });
  }

  //get all produit for <select> </select>
  getProduit(){
    this.http.get(`${this.url}/select/produit/`)
    .subscribe((resultData: any)=>
    {
      this.listePro = resultData.result;
      console.log(this.listePro);
    });
  }

  //click sur btnAjout
  btnAjout(){
    if(this.qteProduit>0){
      let newValue = {
        "id_plat":this.id_recette,
        "libellePro" : this.produit,
        "variete" : this.varProduit,
        "qte" : this.qteProduit,
      }
      // console.log(this.produit,this.qteProduit,this.varProduit);
      this.addProduit(newValue);
      this.produit="";
      this.varProduit="";
      this.qteProduit=0;
    }else{
      this.err="Champs vide non valide.";
    }
  }

  //add new produit
  addProduit(bodyData:{}){
    this.http.post(`${this.url}/plat/add/produit`,bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData,"produit Successfully");
      });
      this.getAllProduit();
      this.getAllProduit();
  }

  //supression d'un produit
  btnSup(id:number){
    this.presentAlert(id);
  }

  //show alert avant suprimer
  async presentAlert(id:number) {
    const alert = await this.alertController.create({
      message: 'voullez-vous vraiment la suprimer?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
        },
        {
          text: 'Suprimer',
          role: 'Suprimer',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='Suprimer'){
      this.http.delete(`${this.url}/delete/detail/`+ id).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Deleted");
        this.getAllProduit();
    });
      console.log(role);
    }

  }

}