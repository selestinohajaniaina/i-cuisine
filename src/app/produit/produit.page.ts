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
  public pro_code:string = '';
  public pro_libelle:string = '';
  public cat_code:string = '';
  public pro_unite:string = '';

  constructor(private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  public liste: IProduit[]=[];
  public listeCat: ICategorie[]=[];

  add(){
    if(this.pro_libelle!=''&&this.pro_code!=''&&this.cat_code!=''&&this.pro_unite!=''){
      
    }else{
      this.err="Champs vide non valide.";
    }
  }

  ngOnInit() {
    
  }


}
