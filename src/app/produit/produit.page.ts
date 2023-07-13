import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ICategorie } from '../categorie/categorie';
import { IProduit } from './produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {

  public err:string = '';
  public libellePro:string = '';
  public unite:string = '';
  public codeCa:string = '';

  constructor(private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  public liste: IProduit[]=[];
  public listeCat: ICategorie[]=[];

  btnAjout(){
    if(this.libellePro!=''&&this.unite!=''&&this.codeCa!=''){
      let newValue = {
        "libellePro" : this.libellePro,
        "codeCa" : this.codeCa,
        "unite" : this.unite,
      }

      console.log(newValue);
      this.libellePro='';
      this.codeCa='';
      this.unite='';
    }else{
      this.err="Champs vide non valide.";
    }
  }

  ngOnInit() {
    
  }


}
