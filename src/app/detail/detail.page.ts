import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public qteProduit:number = 0;
  public id_recette:number;
  public varProduit:string = '';
  public nom_recette:string = '';
  public err:string = '';
  public pro_name:string = '';
  public pro_id:number;
  public dataRec: any;
  public dataPro: any;
  public dataSelectPro: any;
  public dataOnePro: any;

  constructor(private database:DatabaseService ,private route: ActivatedRoute, private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController) { 
    this.database.createDatabase().then(()=>{
      this.getSelectPro();
      this.getSelectPro();
      this.getRec(this.route.snapshot.params['id_recette']);
      this.getRec(this.route.snapshot.params['id_recette']);
      this.getAllPro();
      this.getAllPro();
    })
  }

  ngOnInit() {

    this.id_recette = this.route.snapshot.params['id_recette'];
    console.log("id_recette",this.id_recette);
    
  }

  getRec(id:number) {
    this.database.selectWithParam('plat','id',id).then((data)=>{
      this.dataRec = data;
      this.nom_recette = this.dataRec[0].name;
      console.log('@getRec ito(data): ',data);
    });
    console.log('@getRec ito: ',this.dataRec[0],this.nom_recette);
  }

  getSelectPro() {
    this.database.selectAllTable('produit').then((data)=>{
      this.dataSelectPro = data;
    });
    console.log('@getAllPro ito: ',this.dataSelectPro);
  }

  getAllPro() {
    this.database.selectWithParam('detailPlat','pla_id',this.id_recette).then((data)=>{
      this.dataPro = data;
    });
    console.log('@getAllPro ito: ',this.dataPro);
  }

  addPro() {
    if(this.pro_name&&this.qteProduit){
      this.database.add_pro_rec(this.id_recette, this.pro_name, this.varProduit, this.qteProduit).then(()=>{
        this.pro_name='';
        this.varProduit='';
        this.qteProduit=0;
        this.err='';
        this.getAllPro();
        this.getAllPro();
      });
    }else{
      this.err='Champs vide non valide!';
    }
    
  }

  // select_produit_id(id:number):any {
  //   this.database.selectWithParam('produit','id',id).then((data)=>{
  //     this.dataOnePro = data;
  //     return this.dataOnePro;
  //   });
  // }

  delCat(id: number) {
    this.database.deleteFromTable('detailPlat', id).then(()=>{
        this.getAllPro();
        this.getAllPro();
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

}