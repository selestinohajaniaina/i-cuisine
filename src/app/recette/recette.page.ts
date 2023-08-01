import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IRecette } from './recette';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {

  public nbr_person:number;
  public recetes:any;
  public recName:string = '';
  public err:string = '';

  constructor(private database: DatabaseService, private alertController: AlertController) { 
    this.database.createDatabase().then(()=>{
      this.getAll();
      this.getAll();
    })
  }

  ngOnInit() {
  }

  addRec() {
    if(this.recName){
      this.database.add_rec(this.recName).then(()=>{
        this.getAll();
        this.getAll();
        this.err='';
        this.recName= '';

      });
    }else{
      this.err = "champ vide non valide!";
    }
  }

  getAll() {
    this.database.selectAllTable('plat').then((data)=>{
      this.recetes = data;
    });
    console.log('@getAll ito: ',this.recetes);
  }

  delRec(id: number) {
    this.database.deleteFromTable('plat', id).then(()=>{
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
      this.delRec(id);
    }
  }

}
