import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ICategorie } from '../categorie/categorie';
import { IProduit } from './produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {

  public err:string = '';
  private url = 'http://localhost:3000';
  public libellePro:string = '';
  public unite:string = '';
  public codeCa:string = '';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  public liste: IProduit[]=[];
  public listeCat: ICategorie[]=[];

  btnAjout(){
    if(this.libellePro!=''&&this.unite!=''&&this.codeCa!=''){
      let newValue = {
        "libellePro" : this.libellePro,
        "codeCa" : this.codeCa,
        "unite" : this.unite,
      }

      this.addProduit(newValue);
      console.log(newValue);
      this.libellePro='';
      this.codeCa='';
      this.unite='';
      this.getProduit();
      this.getProduit();
    }else{
      this.err="Champs vide non valide.";
    }
  }

  ngOnInit() {
    this.getProduit();
    this.getCategorie();
  }

  //ajout
  addProduit(bodyData:{}){
    this.http.post(`${this.url}/insert/produit`,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Successfully");
    });
  }
  //supression
  btnSup(id: number)
  {
    this.presentAlert(id);
  }

    //selection des liste de produit
    getProduit(){
      this.http.get(`${this.url}/select/produit/`)
      .subscribe((resultData: any)=>
      {
        this.liste = resultData.result;
        
        console.log(resultData.result);
      });
    }

    //selection de categorie pour le code
  getCategorie(){
    this.http.get(`${this.url}/select/categorie/`)
    .subscribe((resultData: any)=>
    {
      this.listeCat = resultData.result;
      
      console.log(resultData.result);
    });
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
      this.http.delete(`${this.url}/delete/produit/`+ id).subscribe((resultData: any)=>
    {
        console.log(resultData,"produit Deleted");
        this.getProduit();
    });
      console.log(role);
    }

  }

}
