import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public databaseObj: SQLiteObject;
  public tables = {
    avis: "avis",
    categorie: "categorie",
    description: "description",
    detailPlat: "detailPlat",
    favory: "favory",
    plat: "plat",
    produit: "produit",
  }

  constructor(
    private sqlite: SQLite,
    private alertController: AlertController
    ) { }

  async createDatabase() {
    await this.sqlite.create({
      name: "db_cuisine",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.creatTable();
    })
    .catch((e) => {
      this.showAlert(JSON.stringify(e))
    })
  }

  async creatTable() {

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.categorie} ( id INTEGER PRIMARY KEY AUTOINCREMENT, cat_code VARCHAR(255) NOT NULL , name VARCHAR(255) NOT NULL)
    `,[]);

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.produit} ( id INTEGER PRIMARY KEY AUTOINCREMENT, pro_code VARCHAR(255) NOT NULL , cat_code VARCHAR(255) NOT NULL , name VARCHAR(255) NOT NULL , unite VARCHAR(255) NOT NULL)
    `,[]);

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.avis} ( id INTEGER PRIMARY KEY AUTOINCREMENT, pla_id INT NOT NULL , temps VARCHAR(255) NOT NULL , dificulte VARCHAR(255) NOT NULL , etoile VARCHAR(255) NOT NULL , name VARCHAR(255) NOT NULL)
    `,[]);

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.description} ( id INTEGER PRIMARY KEY AUTOINCREMENT, pla_id INT NOT NULL , description VARCHAR(255) NOT NULL)
    `,[]);

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.detailPlat} ( id INTEGER PRIMARY KEY AUTOINCREMENT, pla_id INT NOT NULL , pro_id INT NOT NULL , variete VARCHAR(255) , qte VARCHAR(255) NOT NULL)
    `,[]);

    await this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.tables.plat} ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL)
    `,[]);

  }

  async showAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Database Error',
      message: msg,
      buttons: ['ok']
    })
    await alert.present();
  }

  async add_cat(code: string, name: string) {
    await this.databaseObj.executeSql(`
    INSERT INTO ${this.tables.categorie} (cat_code, name) VALUES ( '${code}', '${name}' )
    `,[])
    .then(()=> {return "categorie inserted"})
    .catch((e) => {
      return e.code == 6 ? "categorie already exist" : `categorie error: ${JSON.stringify(e)}`
    })
  }

  async add_pro(pro_code: string, cat_code: string, name: string, unite: string) {
    await this.databaseObj.executeSql(`
    INSERT INTO ${this.tables.produit} (pro_code, cat_code, name, unite) VALUES ( '${pro_code}', '${cat_code}', '${name}', '${unite}' )
    `,[])
    .then(()=> {return "produit inserted"})
    .catch((e) => {
      return e.code == 6 ? "produit already exist" : `produit error: ${JSON.stringify(e)}`
    })
  }

  async add_rec(name: string) {
    await this.databaseObj.executeSql(`
    INSERT INTO ${this.tables.plat} (name) VALUES ('${name}')
    `,[])
    .then(()=> {return "plat inserted"})
    .catch((e) => {
      return e.code == 6 ? "plat already exist" : `plat error: ${JSON.stringify(e)}`
    })
  }

  async add_pro_rec(id_plat:number, pro_id:number, variete:string|'', Qte:number|string) {
    await this.databaseObj.executeSql(`
    INSERT INTO ${this.tables.detailPlat} (id_plat, pro_id, variete, name, qte) VALUES ('${id_plat}', '${pro_id}', '${variete}', '${name}', '${Qte}')
    `,[])
    .then(()=> {return "plat inserted"})
    .catch((e) => {
      return e.code == 6 ? "plat already exist" : `plat error: ${JSON.stringify(e)}`
    })
  }

  async selectAllTable(table: string) {
    return this.databaseObj.executeSql(`
    SELECT * FROM ${table} ORDER BY name ASC
    `,[])
    .then((res)=> {
      let data = [];
      if(res.rows.length>0){
        for(let i=0;i<res.rows.length;i++){
          data.push(res.rows.item(i));
        }
      }
      return data
    })
    .catch((e) => {
      return`error on getting data from ${table}: ${JSON.stringify(e)}`
    })
  }

  async selectWithParam(table: string,param:string , valeur:string|number) {
    return this.databaseObj.executeSql(`
    SELECT * FROM ${table} WHERE ${param}=${valeur} ORDER BY name ASC
    `,[])
    .then((res)=> {
      let data = [];
      if(res.rows.length>0){
        for(let i=0;i<res.rows.length;i++){
          data.push(res.rows.item(i));
        }
      }
      return data
    })
    .catch((e) => {
      return`error on getting data from ${table}: ${JSON.stringify(e)}`
    })
  }

  async deleteFromTable(table: string, id: number | string) {
    return this.databaseObj.executeSql(`
    DELETE FROM ${table} WHERE id=${id}
    `,[])
    .then((res)=> {return `deleted completly from ${table} where id=${id}`})
    .catch((e) => {
      return`error on deleting data from ${table} (id=${id}): ${JSON.stringify(e)}`
    })
  }

}
