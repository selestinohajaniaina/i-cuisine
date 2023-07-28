import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategorie } from './categorie';
import { AlertController, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  private db:SQLiteObject;

  public err:string = '';

  public liste:ICategorie[]=[];

  public categorieName:string = '';

  public categorieCode:string = '';

  cat_code: string='';
  libelleCa: string='';

  constructor(private http: HttpClient, private alertController: AlertController, private loadingCtrl: LoadingController, private sqlite: SQLite) { 
  }

  creatDB() {
    this.sqlite.create({
      name: 'cuisine.db',
      location: 'default'
    }).then((res:SQLiteObject)=>{
      this.db = res;
      console.log('db created');
    })
    this.db.executeSql('CREATE TABLE IF NOT EXISTS categorie(`cat_id` INTEGER PRIMARY KEY AUTO_INCREMENT, `cat_code` VARCHAR(225), `libelleca` VARCHAR(225))', [])
    .then(() => console.log('Table créée'))
    .catch(e => console.log(e));
  }

  insert(code: string, name:string) {
    this.db.executeSql('INSERT INTO `categorie` (`cat_code`, `libelleCa`) VALUES ("'+code+'", "'+name+'")', [])
    .then(() => console.log('donne enregistre'))
    .catch(e => console.log(e));
    this.select();
  }

  select() {
    this.db.executeSql('SELECT * FROM categorie', [])
    .then((data) => console.log('data fecth',data))
    .catch(e => console.log(e));
  }
  
  //selection
  async getCategorie(){

    const loading = await this.loadingCtrl.create({
      message:'Chargement ...',
    });
    loading.present();
      loading.dismiss();
  }

   ngOnInit() {
    this.getCategorie();
    setTimeout(() => {
      this.creatDB();
    }, 1000);
  }

  add() {
    if(this.categorieCode!=''&& this.categorieName!=''){
      this.insert(this.categorieCode, this.categorieName);
    }else{
      this.err ='Completer tous les champs!';
    }
  }

}
