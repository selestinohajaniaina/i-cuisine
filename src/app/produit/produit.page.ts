import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

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
  public listCat: any;
  public listPro: any;

  constructor(private database: DatabaseService, private alertController: AlertController, private loadingCtrl: LoadingController) { 
    this.database.createDatabase().then(()=>{
      this.getCat();
      this.getCat();
      this.getPro();
      this.getPro();
    })
  }

  getCat() {
    this.database.selectAllTable('categorie').then((data)=>{
      this.listCat = data;
    });
    console.log('@getCat ito: ',this.listCat);
  }

  getPro() {
    this.database.selectAllTable('produit').then((data)=>{
      this.listPro = data;
    });
    console.log('@getPro ito: ',this.listPro);
  }

  add(){
    if(this.pro_libelle!=''&&this.pro_code!=''&&this.cat_code!=''&&this.pro_unite!=''){
      this.database.add_pro(this.pro_code, this.cat_code, this.pro_libelle, this.pro_unite).then(()=>{
        this.getCat();
        this.getCat();
        this.getPro();
        this.getPro();
        this.err='';
      });
      this.pro_libelle='';
      this.pro_code='';
      this.cat_code='';
      this.pro_unite='';
    }else{
      this.err="Champs vide non valide.";
    }
  }

  delPro(id: number) {
    this.database.deleteFromTable('produit', id).then(()=>{
      this.getCat();
      this.getCat();
      this.getPro();
      this.getPro();
      this.err='';
    });
  }

  async showAlert(id: number) {
    const alert = await this.alertController.create({
      message: 'Voullez-vous vraiment la suprimer?',
      buttons: [
        {text:'Annuler', role:'Annuler'},
        {text:'Suprimer', role:'Suprimer'},
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role=='Suprimer'){
      this.delPro(id);
    }
  }

  ngOnInit() {
    
  }


}
