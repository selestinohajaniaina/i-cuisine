import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  public err:string = '';
  public dataCat: any;
  public categorieName:string = '';
  public categorieCode:string = '';

  constructor( private alertController: AlertController, private loadingCtrl: LoadingController, private database: DatabaseService) { 
    this.database.createDatabase().then(()=>{
      this.getAll();
      this.getAll();
    })
  }

  getAll() {
    this.database.selectAllTable('categorie').then((data)=>{
      this.dataCat = data;
    });
    console.log('@getAll ito: ',this.dataCat);
  }

  addOne() {
    if(this.categorieCode.length && this.categorieName.length) {
      this.database.add_cat(this.categorieCode, this.categorieName).then(()=>{
        this.getAll();
        this.getAll();
        this.err='';
      });
      this.categorieCode ='';
      this.categorieName ='';
    }else{
      this.err = "champ vide non valide!";
    }
  }

  delCat(id: number) {
    this.database.deleteFromTable('categorie', id).then(()=>{
      this.getAll();
        this.getAll();
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
      this.delCat(id);
    }
  }

  ngOnInit(): void {
    
  }

}
